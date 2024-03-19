import { Route } from '@angular/router';
import { SavedJobsComponent } from './saved-jobs.component';

export const savedJobsRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: SavedJobsComponent,
    },
];
