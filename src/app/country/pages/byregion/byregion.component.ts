import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountrylistComponent } from "../../components/countrylist/countrylist.component";

@Component({
  selector: 'app-byregion',
  imports: [SearchInputComponent, CountrylistComponent],
  templateUrl: './byregion.component.html'
})
export class ByregionComponent {

  
  onSearch(value: string){
    console.log(value)
  }


 }
