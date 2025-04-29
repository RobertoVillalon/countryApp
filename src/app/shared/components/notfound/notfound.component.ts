import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-notfound',
  imports: [],
  templateUrl: './notfound.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent { 
  location = inject(Location)

  goBack(){
    this.location.back()
  }
}
