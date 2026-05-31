import { Component, inject, signal, OnInit } from '@angular/core';
import { CryptoService } from '../../core/services/crypto.service'
import type { Crypto } from '../../core/models/crypto.model';
import { CryptoCardComponent } from "../../shared/components/crypto-card/crypto-card.component";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { FilterSearchPipe } from '../../shared/pipes/filter-search.pipe';

@Component({
	templateUrl: './dashboard.html',
	styleUrl: './dashboard.scss',
	imports: [CryptoCardComponent, SpinnerComponent, SearchBarComponent, FilterSearchPipe]
})
export class DashboardComponent implements OnInit {
	private crypto = inject(CryptoService)
	searchText = signal('')
	coins = signal<Crypto[]>([])
	isLoading = signal(true)

	ngOnInit(): void {
		this.loadMarkets()
	}

	loadMarkets(): void {
    this.isLoading.set(true)
    this.crypto.getMarkets().subscribe({
      next: (coins) => {
        this.coins.set(coins)
        this.isLoading.set(false)
      },
      error: () => this.isLoading.set(false)
    })
  }
}