import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-countrylist',
  imports: [DecimalPipe, RouterLink, RouterLinkActive],
  templateUrl: './countrylist.component.html',
})
export class CountrylistComponent {
  countries = input.required<Country[]>()

  errorMessage = input<string | unknown>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(false)
}
