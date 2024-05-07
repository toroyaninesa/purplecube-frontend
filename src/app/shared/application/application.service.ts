import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {IApplication} from "../../models/application.model";

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(private httpClient: HttpClient) {
    }

    moveApplicationStatus(jobId: number, stageId: number): Observable<IApplication> {
        const url = Location.joinWithSlash(
            environment.baseURL || '',
            `/jobs/applications/${jobId}`
        );
        return this.httpClient.post<IApplication>(url, {stageId});
    }
}
