import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'signedNumber', standalone: true })
export class SignedNumberPipe implements PipeTransform {
	transform(value: number, options?: Intl.NumberFormatOptions): string {
		const absValue = Math.abs(value)

		const fractionDigits = absValue === 0
			? 2
			: Math.max(2, Math.ceil(-Math.log10(absValue)) + 1)

		return new Intl.NumberFormat('en-US', {
			signDisplay: 'exceptZero',
			minimumFractionDigits: 2,
			maximumFractionDigits: fractionDigits,
			...options
		}).format(value)
	}
}