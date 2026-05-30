import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { RouterOutlet } from '@angular/router'
import { interval, switchMap, startWith, catchError, of } from 'rxjs'
import { PingService } from './core/services/ping.service'

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App implements OnInit {
	private ping = inject(PingService)
	private destroyRef = inject(DestroyRef)

	backendStatus = signal<'ok' | 'degraded' | 'unknown'>('unknown')
	isDark = signal<boolean>(true)

	ngOnInit(): void {
		this.applyTheme()
		this.startPingInterval()
	}

	private startPingInterval(): void {
		interval(60000).pipe(
			startWith(0),
			switchMap(() =>
				this.ping.check().pipe(
					catchError(() => {
						this.backendStatus.set('degraded')
						return of(null)
					})
				)
			),
			takeUntilDestroyed(this.destroyRef)
		).subscribe({
			next: (res) => {
				if (res) this.backendStatus.set(res.data.status)
			}
		})
	}

	toggleTheme(): void {
		this.isDark.update(v => !v)
		this.applyTheme()
	}

	private applyTheme(): void {
		const body = document.body
		body.classList.toggle('dark-theme', this.isDark())
		body.classList.toggle('light-theme', !this.isDark())
	}
}