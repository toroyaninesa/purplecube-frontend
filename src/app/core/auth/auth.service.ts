import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, switchMap, throwError} from 'rxjs';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';
import {IUserRole} from '../../models/user.model';
import {User} from '../user/user.types';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private _userRole: IUserRole;

    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    get accessToken(): string {
      return localStorage.getItem('accessToken') ?? '';
    }
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/auth/login'
        );
        return this._httpClient.post(url, credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                this._userRole = response.user.role;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/auth/refresh-access-token'
        );
        // Renew token
        return this._httpClient
            .post(url, {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of({ allowed: false })
                ),
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.token;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    this._userRole = response.user.role;

                    // Return true
                    return of({ allowed: true, role: this._userRole });
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
      name: string;
      surname: string;
      email: string;
      password: string;
      role: IUserRole;
    }): Promise<{ user: User; token: string } | undefined> {
     const obs = this._httpClient.post<{ user: User; token: string}>(
        'http://localhost:3000/auth/register',
        user
      );
     obs.subscribe((res) => {
       // Store the access token in the local storage
       this.accessToken = res.token;

       // Set the authenticated flag to true
       this._authenticated = true;

       // Store the user on the user service
       this._userService.user = res.user;

       this._userRole = user.role;
     });
      return obs.toPromise();
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(
        roles?: IUserRole[]
    ): Observable<{ role: IUserRole; allowed: boolean }> {
        // Check if the user is logged in
        if (this._authenticated) {
            if (roles && roles.indexOf(this._userRole) === -1) {
                return of({
                    allowed: false,
                    role: this._userRole,
                });
            }
            return of({
                allowed: true,
                role: this._userRole,
            });
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of({ allowed: false, role: this._userRole });
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of({
                allowed: false,
                role: this._userRole,
            });
        }

        return this.signInUsingToken();

        // If the access token exists and it didn't expire, sign in using it
        //return this.signInUsingToken();
    }
}
