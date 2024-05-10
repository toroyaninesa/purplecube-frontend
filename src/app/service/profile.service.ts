import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {ICreateExperience,IExperience} from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private _httpClient: HttpClient) {}

    saveUserProfile(experienceList: ICreateExperience[]): Observable<IExperience[]> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/user/experience/'
        );
        return this._httpClient.post<IExperience[]>(url,experienceList);
    }

    getExperience(): Observable<IExperience[]> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/user/experience'
        );
        return this._httpClient.get<IExperience[]>(url);
    }
    deleteExperience(id: number): Observable<boolean>{
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            `/user/experience/${id}`,
        );
        return this._httpClient.delete<boolean>(url);
    }


}
