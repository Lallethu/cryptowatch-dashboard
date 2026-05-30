import { inject } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'

export abstract class BaseApiService {
	protected http = inject(HttpClient)
	protected baseUrl = environment.apiUrl

	protected get<T>(endpoint: string): Observable<T> {
		return this.http
			.get<T>(`${this.baseUrl}${endpoint}`)
			.pipe(catchError(this.handleError))
	}

	protected post<T>(endpoint: string, body: unknown): Observable<T> {
		return this.http
			.post<T>(`${this.baseUrl}${endpoint}`, body)
			.pipe(catchError(this.handleError))
	}

	protected delete<T>(endpoint: string): Observable<T> {
		return this.http
			.delete<T>(`${this.baseUrl}${endpoint}`)
			.pipe(catchError(this.handleError))
	}

	private handleError(error: HttpErrorResponse): Observable<never> {
		const message = error.error?.message ?? `Erreur ${error.status}`
		return throwError(() => new Error(message))
	}
}
