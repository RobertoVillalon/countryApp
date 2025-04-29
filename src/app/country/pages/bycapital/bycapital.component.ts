import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountrylistComponent } from "../../components/countrylist/countrylist.component";
import { rxResource } from "@angular/core/rxjs-interop"
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-bycapital',
  imports: [SearchInputComponent, CountrylistComponent],
  templateUrl: './bycapital.component.html'
})
export class BycapitalComponent {
  countryService = inject(CountryService)
  query = signal('')

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([])

      return this.countryService.searchByCapital(request.query)

    }
  })

//   countryResource = resource({
//     request: () => ({query: this.query()}),
//     loader: async({request}) => {
//       if(!request.query) return []
//       return await firstValueFrom(this.countryService.searchByCapital(request.query))
//     }
//   })
}
