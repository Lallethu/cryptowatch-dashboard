import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UpperCasePipe, DecimalPipe, CurrencyPipe } from '@angular/common'
import { SignedNumberPipe } from '../../shared/pipes/signed-number.pipe'
import { switchMap } from 'rxjs'
import { BaseChartDirective } from 'ng2-charts';
import { CryptoService } from '../../core/services/crypto.service'
import type { CryptoDetail, Crypto } from '../../core/models/crypto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
	standalone: true,
	selector: 'app-detail',
	templateUrl: './detail.html',
	styleUrl: './detail.scss',
	imports: [BaseChartDirective, UpperCasePipe, DecimalPipe, CurrencyPipe, SignedNumberPipe],
})
export class DetailComponent implements OnInit {
	private router = inject(Router)
	private activatedRoute = inject(ActivatedRoute)
	private crypto = inject(CryptoService)
	private destroyRef = inject(DestroyRef)

	coin = signal<Crypto | null>(
		this.router.currentNavigation()?.extras.state?.['coin'] ?? null
	)
	isLoading = signal(true)
	chartType = 'line' as const

	chartData: ChartData<'line', number[]> = {
		labels: [],
		datasets: [{
			label: 'Prix (USD)',
			data: [],
			borderColor: '#f69119',
			backgroundColor: 'rgba(246, 145, 25, 0.1)',
			fill: true,
			tension: 0.4,
			pointRadius: 0,
		}]
	}

	chartOptions: ChartOptions<'line'> = {
		responsive: true,
		plugins: {
			legend: { display: false },
			tooltip: {
				callbacks: {
					label: (ctx) => `$${ctx?.parsed?.y?.toLocaleString()}`
				}
			}
		},
		scales: {
			x: { grid: { display: false } },
			y: { grid: { color: 'rgba(255,255,255,0.05)' } }
		}
	}

	ngOnInit(): void {
		this.activatedRoute.params.pipe(
			switchMap((params) => this.crypto.marketChart(params['id'])),
			takeUntilDestroyed(this.destroyRef)
		).subscribe({
			next: (info) => this.buildChart(info),
			error: () => this.isLoading.set(false)
		})
	}

	private buildChart(info: CryptoDetail): void {
		this.chartData = {
			labels: info.prices.map(([timestamp]) =>
				new Date(timestamp).toLocaleDateString('en-EN', { month: 'short', day: 'numeric' })
			),
			datasets: [{
				...this.chartData.datasets[0],
				data: info.prices.map(([, price]) => price)
			}]
		}
		this.isLoading.set(false)
	}
}