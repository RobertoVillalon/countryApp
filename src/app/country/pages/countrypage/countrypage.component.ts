import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotfoundComponent } from "../../../shared/components/notfound/notfound.component";
import { CountryinformationComponent } from "./countryinformation/countryinformation.component";

@Component({
  selector: 'app-countrypage',
  imports: [NotfoundComponent, CountryinformationComponent],
  templateUrl: './countrypage.component.html'
})
export class CountrypageComponent { 
  countryService = inject(CountryService)
  countryCode = inject(ActivatedRoute).snapshot.params['code']
  countryResourse = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({ request }) => this.countryService.searchCountryByCode(request.code)
  })

}
