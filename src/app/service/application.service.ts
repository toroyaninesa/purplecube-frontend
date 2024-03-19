import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../environments/environment";
import {IApplication} from "../models/application.model";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private _httpClient: HttpClient) { }

    getUserApplications() {
        const url = Location.joinWithSlash(
            environment.baseURL  || '', `/applications/`
        );
        return this._httpClient.get<IApplication[]>(url);
    }
}
