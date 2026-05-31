import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { BaseApiService } from './base-api.service'
import { ApiResponse } from '../models/api.model'
import type { Crypto } from '../models/crypto.model'

@Injectable({ providedIn: 'root' })
export class FavoritesService extends BaseApiService {
	constructor() {
		super()
		this.baseUrl = `${this.baseUrl}/favorites`
	}

	getFavorites(): Observable<Crypto[]> {
		return this.get<ApiResponse<Crypto[]>>('/').pipe(
			map(res => res.data)
		)
	}

	getFavoritesIds(): Observable<string[]> {
		return this.getFavorites().pipe(
			map(coins => coins.map(coin => coin.id))
		)
	}

	addFavorite(id: string): Observable<string[]> {
		return this.post<ApiResponse<string[]>>('/', { id }).pipe(map(res => res.data))
	}

	removeFavorite(id: string): Observable<string[]> {
		return this.delete<ApiResponse<string[]>>('/', { id }).pipe(map(res => res.data))
	}
}