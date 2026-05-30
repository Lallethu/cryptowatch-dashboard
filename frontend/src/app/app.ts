import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PingService } from './core/services/ping.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App implements OnInit {
	private ping = inject(PingService)

	protected readonly title = signal('frontend');

	backendStatus = signal<'ok' | 'degraded' | 'unknown'>('unknown')

	ngOnInit(): void {
		this.ping.check().subscribe({
			next: (res) => this.backendStatus.set(res.data.status),
			error: () => this.backendStatus.set('degraded')
		})
	}
}
