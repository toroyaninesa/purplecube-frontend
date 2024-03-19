import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from '../../../service/application.service';
import { EStatus, IApplication } from '../../../models/application.model';
import { MatStepper } from '@angular/material/stepper';
import { NavigationService } from '../../../core/navigation/navigation.service';

@Component({
    selector: 'app-applications',
    templateUrl: './user-applications.component.html',
    styleUrls: ['./user-applications.component.scss'],
})
export class UserApplicationsComponent implements OnInit {
    applications: IApplication[];
    EStatus = EStatus;
    constructor(
        private _appService: ApplicationService,
        private _nav: NavigationService
    ) {}

    ngOnInit(): void {
        this._nav.page = 'Applications';
        this._appService.getUserApplications().subscribe((apps) => {
            this.applications = apps;
        });
    }
}
