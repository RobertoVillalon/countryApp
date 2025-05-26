import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountrylistComponent } from "../../components/country-list/countrylist.component";
import { ButtonGroupComponent } from "../../components/button-group/button-group.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-byregion',
  imports: [ CountrylistComponent, ButtonGroupComponent],
  templateUrl: './byregion.component.html'
})
export class ByregionComponent {
  countryService = inject(CountryService)
  regions = signal(['Africa','Americas','Asia','Europe','Oceania','Antarctic']);
  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = linkedSignal(() => this.queryParam)
  router = inject(Router)

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([])
      
      this.router.navigate(['/country/by-region'], {
        queryParams: {query: request.query}
      })

      return this.countryService.searchCountryByRegion(this.query())
    }
  })

 }
