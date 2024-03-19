import {Route} from '@angular/router';
import {UserApplicationsComponent} from "./user-applications.component";

export const applicationsRoutes: Route[] = [
    {
        path: '',
        pathMatch : 'full',
        component: UserApplicationsComponent
    },
];
