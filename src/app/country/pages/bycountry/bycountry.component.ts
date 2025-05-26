import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountrylistComponent } from "../../components/country-list/countrylist.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bycountry',
  imports: [SearchInputComponent, CountrylistComponent],
  templateUrl: './bycountry.component.html'
})
export class BycountryComponent {
  countryService = inject(CountryService)
  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = linkedSignal(() => this.queryParam)
  router = inject(Router)

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([])

      this.router.navigate(['/country/by-country'], {
        queryParams: {query: request.query}
      })

      return this.countryService.searchByCountry(request.query)

    }
  })
 }
