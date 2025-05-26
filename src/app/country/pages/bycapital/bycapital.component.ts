import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountrylistComponent } from "../../components/country-list/countrylist.component";
import { rxResource } from "@angular/core/rxjs-interop"
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bycapital',
  imports: [SearchInputComponent, CountrylistComponent],
  templateUrl: './bycapital.component.html'
})
export class BycapitalComponent {
  countryService = inject(CountryService)
  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = linkedSignal(() => this.queryParam)
  router = inject(Router)

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([])

      this.router.navigate(['/country/by-capital'], {
        queryParams: {query: request.query}
      })

      return this.countryService.searchByCapital(request.query)
    }
  })
}
