import { Component, output } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
	standalone: true,
	selector: 'app-search-bar',
	templateUrl: './search-bar.html',
	styleUrl: './search-bar.scss',
	imports: [ReactiveFormsModule]
})
export class SearchBarComponent {
	searchChange = output<string>()
	searchControl = new FormControl('')

	constructor() {
		this.searchControl.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			takeUntilDestroyed()
		).subscribe(value => {
			this.searchChange.emit(value ?? '')
		})
	}
}