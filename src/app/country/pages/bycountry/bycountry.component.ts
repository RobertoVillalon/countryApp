import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountrylistComponent } from "../../components/countrylist/countrylist.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bycountry',
  imports: [SearchInputComponent, CountrylistComponent],
  templateUrl: './bycountry.component.html'
})
export class BycountryComponent {
  countryService = inject(CountryService)
  query = signal('')

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([])

      return this.countryService.searchByCountry(request.query)

    }
  })
 }
