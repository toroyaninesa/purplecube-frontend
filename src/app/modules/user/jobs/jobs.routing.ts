import { Route } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { LandingJobComponent } from './landing-job/landing-job.component';
import { SingleJobComponent } from './single-job/single-job.component';

export const jobRoutes: Route[] = [
    {
        path: '',
        component: LandingJobComponent,
        children: [
            { path: '', redirectTo: 'all', pathMatch: 'full' },
            {
                path: 'all',
                component: JobsComponent,
            },
            {
                path: ':id',
                pathMatch: 'full',
                component: SingleJobComponent,
            },
        ],
    },
];
