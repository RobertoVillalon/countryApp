import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-countryinformation',
  imports: [DecimalPipe],
  templateUrl: './countryinformation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryinformationComponent { 
  country = input.required<Country>()
}
