import { Component, OnInit} from '@angular/core';
import {JobsService} from '../../../../service/jobs.service';
import {ActivatedRoute} from '@angular/router';
import {IApplication} from '../../../../models/application.model';
import { take } from 'rxjs';


@Component({
    selector: 'app-application',
    templateUrl: './company-user-application.component.html',
    styleUrls: ['./company-user-application.component.scss']
})
export class CompanyUserApplicationComponent implements OnInit {
    application: IApplication;

    constructor(
        private _jobService: JobsService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
       this.getApplication();
    }

    getApplication(): void {
        this._jobService
            .getApplicantById(+this._route.snapshot.paramMap.get('id'))
            .pipe(take(1))
            .subscribe(result => this.application = result);
    }
}

