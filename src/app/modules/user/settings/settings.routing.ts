import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';

export const settingsRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: SettingsComponent,
        data: { title: 'Settings' }
    },
];
