import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, take, tap} from 'rxjs';
import { IUser } from 'app/models/user.model';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import { IJob } from '../../models/job.model';
import { ICompany} from '../../models/company.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _user: ReplaySubject<IUser> = new ReplaySubject<IUser>(1);
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: IUser) {
        // Store the value
        this._user.next(value);
    }
    set company(value: ICompany){
      this._user.pipe(take(1)).subscribe(
        value1 => this.user = {...value1,company:value}
      );
    }

    get user$(): Observable<IUser> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<IUser> {
        return this._httpClient.get<IUser>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: IUser): Observable<any> {
        return this._httpClient.patch<IUser>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    getSavedJobs() {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/user/saved'
        );
        return this._httpClient.get<IJob[]>(url);
    }

    applyToJob(jobId) {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            `/jobs/apply/${jobId}`
        );
        return this._httpClient.post(url, null);
    }
}
