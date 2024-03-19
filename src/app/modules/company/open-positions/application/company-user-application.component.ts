import {Component, OnInit} from '@angular/core';
import {JobsService} from "../../../../service/jobs.service";
import {ActivatedRoute} from "@angular/router";
import {EStatus, IApplication} from "../../../../models/application.model";

@Component({
    selector: 'app-application',
    templateUrl: './company-user-application.component.html',
    styleUrls: ['./company-user-application.component.scss']
})
export class CompanyUserApplicationComponent implements OnInit {

    app: IApplication;
    EStatus = EStatus;
    constructor(
        private _jobService: JobsService,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        console.log(this._route.snapshot.paramMap.get("id"))
        this._jobService.getApplicantById(+this._route.snapshot.paramMap.get("id"))
            .subscribe((application) => {
                this.app = application;
            })
    }

}
