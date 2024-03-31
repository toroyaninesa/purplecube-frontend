import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { HomeDataResolver } from './resolver/HomeDataResolver';
import { IUserRole } from './models/user.model';

export const appRoutes: Route[] = [
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'jobs' },
    { path: '', redirectTo: '/sign-in' , pathMatch: 'full'},
    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
            roles: [IUserRole.COMPANY, IUserRole.ADMIN, IUserRole.USER],
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            roles: [IUserRole.ADMIN, IUserRole.USER, IUserRole.COMPANY],
        },
        resolve: {
            initialData: HomeDataResolver,
        },
        children: [
            {
                path: 'jobs',
                loadChildren: () =>
                    import('app/modules/user/jobs/jobs.module').then(
                        (m) => m.JobsModule
                    ),
            },
            {
                path: 'saved',
                loadChildren: () =>
                    import(
                        'app/modules/user/saved-jobs/saved-jobs.module'
                    ).then((m) => m.SavedJobsModule),
            },
            {
                path: 'applications',
                loadChildren: () =>
                    import(
                        'app/modules/user/applications/applications.module'
                    ).then((m) => m.ApplicationsModule),
            },
        ],
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            roles: [IUserRole.COMPANY],
        },
        resolve: {
            initialData: HomeDataResolver,
        },
        children: [
            {
                path: 'my-company',
                loadChildren: () =>
                    import(
                        'app/modules/company/my-company/my-company.module'
                    ).then((m) => m.MyCompanyModule),
            },
            {
                path: 'new-vacancy',
                loadChildren: () =>
                    import(
                        'app/modules/company/new-vacancy/new-vacancy.module'
                    ).then((m) => m.NewVacancyModule),
            },
            {
                path: 'open-positions',
                loadChildren: () =>
                    import(
                        'app/modules/company/open-positions/open-positions.module'
                    ).then((m) => m.OpenPositionsModule),
            },
        ],
    },
];
