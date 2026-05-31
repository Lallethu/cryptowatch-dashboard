import { Component, Input } from "@angular/core";

@Component({
	standalone: true,
	selector: "app-spinner",
	templateUrl: "./spinner.html",
	styleUrl: "./spinner.scss"
})
export class SpinnerComponent {
	@Input() message = '';
}