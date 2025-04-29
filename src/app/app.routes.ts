import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent
    },
    {
        path: 'country',
        loadChildren: () => import('./country/country.routes')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
