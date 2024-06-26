import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { IApplication } from '../models/application.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(private _httpClient: HttpClient) {}

    getUserApplications(): Observable<IApplication[]> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/applications/'
        );
        return this._httpClient.get<IApplication[]>(url);
    }
}
