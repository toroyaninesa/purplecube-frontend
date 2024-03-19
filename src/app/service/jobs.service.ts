import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { ICategory, IJob } from '../models/job.model';
import { IApplication } from '../models/application.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JobsService {
    constructor(private httpClient: HttpClient) {}

    getCompanyPositions(): Observable<IJob[]> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/jobs/my'
        );
        return this.httpClient.get<IJob[]>(url);
    }

    getAllCategories(): Observable<ICategory[]> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/jobs/categories'
        );
        return this.httpClient.get<ICategory[]>(url);
    }

    getJobApplicants(id: number): Observable<IApplication[]> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            `/jobs/${id}/applicants`
        );
        return this.httpClient.get<IApplication[]>(url);
    }

    getApplicantById(id: number): Observable<IApplication> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            `/jobs/applications/${id}`
        );
        return this.httpClient.get<IApplication>(url);
    }

    getJobById(id: number): Observable<IJob> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            `/jobs/${id}`
        );
        return this.httpClient.get<IJob>(url);
    }

    getJobs(
        skip: number = 0,
        limit: number = 2,
        title?: string,
        emp?: string[],
        level?: string[],
        cat?: string[]
    ): Observable<any> {
        let url = Location.joinWithSlash(
            environment.baseURL || '',
            `/jobs?skip=${skip}&limit=${limit}`
        );
        if (emp) {
            for (const type of emp) {
                url += `&emp[]=${type}`;
            }
        }
        if (level) {
            for (const type of level) {
                url += `&level[]=${type}`;
            }
        }
        if (title) {
            url += `&title=${title}`;
        }

        if (cat) {
            for (const type of cat) {
                url += `&cat[]=${type}`;
            }
        }
        return this.httpClient.get<{ jobs: IJob[]; count: number }>(url);
    }

    saveJobToUser(id: number, userId: number): Observable<any> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            `/jobs/save/${id}`
        );
        return this.httpClient.post(url, { id: userId });
    }

    getSavedJobs(): Observable<IJob[]> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            '/jobs/saved'
        );
        return this.httpClient.get<IJob[]>(url);
    }

    createJob(job): Observable<any> {
        const url = Location.joinWithSlash(environment.baseURL || '', '/jobs/');
        return this.httpClient.post(url, job);
    }
}
