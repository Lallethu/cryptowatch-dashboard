import { Pipe, PipeTransform } from '@angular/core';
import type { Crypto } from '../../core/models/crypto.model';

@Pipe({
	standalone: true,
	name: 'filterSearch',
})
export class FilterSearchPipe implements PipeTransform {
	transform(coins: Crypto[], searchText: string): Crypto[] {
		if (!coins || !searchText) return coins ?? []
		const search = searchText.toLowerCase()
		return coins.filter(({ symbol, name }) =>
			symbol.toLowerCase().includes(search)
			|| name.toLowerCase().includes(search)
		)
	}
}