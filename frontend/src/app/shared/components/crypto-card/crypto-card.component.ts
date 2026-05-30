import { Component, Input } from '@angular/core';
import type { Crypto } from '../../../core/models/crypto.model';
import { CurrencyPipe } from '@angular/common';
import { SignedNumberPipe } from '../pipes/signed-number.pipe';

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
	@Input({ required: true }) coin!: Crypto
}