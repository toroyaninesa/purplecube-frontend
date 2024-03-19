import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { IUserRole } from '../../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);
    private _page: ReplaySubject<string> = new ReplaySubject<string>(1);
    static navigation: Navigation = {
        default: [
            {
                role: [IUserRole.ADMIN],
                type: 'basic',
                title: 'Dashboard',
                icon: 'heroicons_outline:menu',
                link: '/dashboard',
            },
            {
                role: [IUserRole.ADMIN, IUserRole.USER, IUserRole.COMPANY],
                type: 'basic',
                title: 'Find Jobs',
                icon: 'heroicons_outline:search',
                link: '/jobs',
                children: [
                    {
                        role: [
                            IUserRole.ADMIN,
                            IUserRole.USER,
                            IUserRole.COMPANY,
                        ],
                        type: 'basic',
                        title: 'Find Jobs',
                        icon: 'heroicons_outline:search',
                        link: '/jobs',
                    },
                ],
            },
            {
                role: [IUserRole.USER],
                type: 'basic',
                title: 'Saved Jobs',
                icon: 'heroicons_outline:bookmark',
                link: '/saved',
            },
            {
                role: [IUserRole.USER],
                type: 'basic',
                title: 'Applications',
                icon: 'heroicons_outline:annotation',
                link: '/applications',
            },
            {
                role: [IUserRole.ADMIN, IUserRole.USER],
                type: 'basic',
                title: 'Browse Companies',
                icon: 'heroicons_outline:office-building',
                link: '/company',
            },
            {
                role: [IUserRole.USER],
                type: 'basic',
                title: 'My Public Profile',
                icon: 'heroicons_outline:user',
                link: '/profile',
            },
            {
                role: [IUserRole.USER],
                type: 'basic',
                title: 'Settings',
                icon: 'heroicons_outline:support',
                link: '/settings',
            },
            {
                role: [IUserRole.ADMIN],
                type: 'basic',
                title: 'Admin',
                icon: 'heroicons_outline:user-group',
                link: '/admin',
            },
            {
                role: [IUserRole.COMPANY],
                type: 'basic',
                title: 'My Company',
                icon: 'heroicons_outline:office-building',
                link: '/my-company',
            },
            {
                role: [IUserRole.COMPANY],
                type: 'basic',
                title: 'New Vacancy',
                icon: 'heroicons_outline:pencil-alt',
                link: '/new-vacancy',
            },
            {
                role: [IUserRole.COMPANY],
                type: 'basic',
                title: 'Open Positions',
                icon: 'heroicons_outline:archive',
                link: '/open-positions',
            },
        ],
    };

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    get page$(): Observable<string> {
        return this._page.asObservable();
    }

    set page(page) {
        this._page.next(page);
    }

    static getNavigation(role?: IUserRole): Navigation {
        const roleIdCheck = (arr?: IUserRole[]) => {
            if (!role || !arr) {
                return true;
            }
            if (arr) {
                return arr.indexOf(role) !== -1;
            }
        };
        return {
            default: this.navigation.default.filter((item) =>
                roleIdCheck(item.role)
            ),
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }
}
