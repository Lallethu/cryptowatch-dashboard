import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FavoritesService } from '../../core/services/favorites.service'
import type { Crypto } from '../../core/models/crypto.model'
import { CryptoCardComponent } from '../../shared/components/crypto-card/crypto-card.component'
import { RouterLink } from '@angular/router'
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";

@Component({
	standalone: true,
	selector: 'app-favorites',
	templateUrl: './favorites.html',
	styleUrl: './favorites.scss',
	imports: [CryptoCardComponent, RouterLink, SpinnerComponent]
})
export class FavoritesComponent implements OnInit {
	private favorites = inject(FavoritesService)
	private destroyRef = inject(DestroyRef)

	coins = signal<Crypto[]>([])
	isLoading = signal(true)

	ngOnInit(): void {
		this.favorites.getFavorites().pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe({
			next: (coins) => {
				this.coins.set(coins)
				this.isLoading.set(false)
			},
			error: () => this.isLoading.set(false)
		})
	}
}