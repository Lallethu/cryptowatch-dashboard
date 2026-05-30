import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { BaseApiService } from './base-api.service'
import { ApiResponse } from '../models/api.model'
import type { Crypto } from '../models/crypto.model'

@Injectable({ providedIn: 'root' })
export class CryptoService extends BaseApiService {
	constructor() {
		super()
		this.baseUrl = `${this.baseUrl}/crypto`
	}

	getMarkets(): Observable<Crypto[]> {
		return this.get<ApiResponse<Crypto[]>>('/getMarkets').pipe(map(res => res.data))
	}

	getById(id: string): Observable<Crypto> {
		return this.get<Crypto>(`/crypto/${id}`)
	}
}