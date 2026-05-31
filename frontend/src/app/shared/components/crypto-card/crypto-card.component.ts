import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router'
import type { Crypto } from '../../../core/models/crypto.model';
import { CurrencyPipe } from '@angular/common';
import { SignedNumberPipe } from '../../pipes/signed-number.pipe';

@Component({
	selector: 'app-crypto-card',
	templateUrl: './crypto-card.html',
	styleUrl: './crypto-card.scss',
	imports: [CurrencyPipe, SignedNumberPipe],
})
@Input({
	alias: 'coin',
	required: true
})
export class CryptoCardComponent {
	private router = inject(Router)
	@Input({ required: true }) coin!: Crypto

	navigate(): void {
		this.router.navigate(['/detail', this.coin.id], {
			state: { coin: this.coin }
		}).catch(() => null)
	}
}