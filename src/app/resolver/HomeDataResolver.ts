import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../core/user/user.types';
import {UserService} from '../core/user/user.service';
import {AuthService} from '../core/auth/auth.service';
import {FuseSplashScreenService} from '../../@fuse/services/splash-screen';
import {catchError, Observable, of, tap} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomeDataResolver implements Resolve<User>
{
    /**
     * Constructor
     */
    constructor(
        private _userService: UserService,
        private _splashService: FuseSplashScreenService,
        private _authService: AuthService

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
        this._splashService.show();
        if(this._authService.accessToken) {
            return this._authService.signInUsingToken().pipe(
                tap((_) => {
                    this._splashService.hide();
                }),
                catchError((_) => {
                    this._splashService.hide();
                    return of(null);
                })
            );
        }
        return of(undefined);
    }
}

