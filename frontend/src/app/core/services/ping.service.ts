import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseApiService } from './base-api.service'
import type { PingResponse } from '../models/ping.model'

@Injectable({ providedIn: 'root' })
export class PingService extends BaseApiService {
	constructor() {
		super()
		this.baseUrl = `${this.baseUrl + '/ping'}`
	}
	
	check(): Observable<PingResponse> {
		return this.get<PingResponse>('')
	}
}
