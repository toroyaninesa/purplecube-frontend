import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {EmploymentLevelEnum, EmploymentTypeEnum, ICategory, IJob} from "../models/job.model";
import {IApplication} from "../models/application.model";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
      private httpClient: HttpClient
  ) { }

    getCompanyPositions() {
        const url = Location.joinWithSlash(
            environment.baseURL  || '', '/jobs/my'
        );
        return this.httpClient.get<IJob[]>(url);
    }

    getAllCategories() {
        const url = Location.joinWithSlash(
            environment.baseURL  || '', '/jobs/categories'
        );
        return this.httpClient.get<ICategory[]>(url);
    }

    getJobApplicants(id: number) {
        console.log(id)
        const url = Location.joinWithSlash(
            environment.baseURL  || '', `/jobs/${id}/applicants`
        );
        return this.httpClient.get<IApplication[]>(url);
    }

    getApplicantById(id: number) {
        const url = Location.joinWithSlash(
            environment.baseURL  || '', `/jobs/applications/${id}`
        );
        return this.httpClient.get<IApplication>(url);
    }

    getJobById(id: number) {
      const url = Location.joinWithSlash(
          environment.baseURL  || '', `/jobs/${id}`
      );
        return this.httpClient.get<IJob>(url);
    }

    getJobs(skip: number = 0 ,limit: number = 2, title?: string, emp?: string[], level?: string[], cat?: string[] ) {
        let url = Location.joinWithSlash(
            environment.baseURL  || '', `/jobs?skip=${skip}&limit=${limit}`
        );
       if (emp) {
           for(const type of emp ) {
               url += `&emp[]=${type}`;
           }
       }
       if (level) {
           for(const type of level ) {
               url += `&level[]=${type}`;
           }
       }
       if (title) {
           url += `&title=${title}`;
       }

        if (cat) {
            for(const type of cat ) {
                url += `&cat[]=${type}`;
            }
        }
        return this.httpClient.get<{jobs: IJob[]; count: number}>(url);
    }

    saveJobToUser(id: number, userId: number) {
        const url = Location.joinWithSlash(
            environment.baseURL  || '', `/jobs/save/${id}`
        );
        return this.httpClient.post(url, {id: userId});
    }

    getSavedJobs() {
        const url = Location.joinWithSlash(
            environment.baseURL  || '', '/jobs/saved'
        );
        return this.httpClient.get<IJob[]>(url);
    }

    createJob(job) {
        const url = Location.joinWithSlash(
            environment.baseURL  || '', '/jobs/'
        );
        return this.httpClient.post(url, job);
    }

}
