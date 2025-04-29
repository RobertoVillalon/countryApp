import { Routes } from '@angular/router';
import { BycapitalComponent } from './pages/bycapital/bycapital.component';
import { CountrylayoutComponent } from './layouts/countrylayout/countrylayout.component';
import { BycountryComponent } from './pages/bycountry/bycountry.component';
import { ByregionComponent } from './pages/byregion/byregion.component';
import { CountrypageComponent } from './pages/countrypage/countrypage.component';

export const countryRoutes: Routes = [
    {
        path: "",
        component: CountrylayoutComponent,
        children: [
            {
                path: 'by-capital',
                component: BycapitalComponent
            },
            {
                path: 'by-country',
                component: BycountryComponent
            },
            {
                path: 'by-region',
                component: ByregionComponent
            },
            {
                path: 'by/:code',
                component: CountrypageComponent
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            }
        ]
    }
];

export default countryRoutes;