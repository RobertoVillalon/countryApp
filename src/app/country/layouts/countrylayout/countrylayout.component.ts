import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopmenuComponent } from "../../components/topmenu/topmenu.component";

@Component({
  selector: 'app-countrylayout',
  imports: [RouterOutlet, TopmenuComponent],
  templateUrl: './countrylayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrylayoutComponent { }
