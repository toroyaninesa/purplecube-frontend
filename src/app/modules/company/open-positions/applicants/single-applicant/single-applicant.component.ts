import {Component, Input, OnInit} from '@angular/core';
import {IApplication} from "../../../../../models/application.model";

@Component({
    selector: 'app-single-applicant',
    templateUrl: './single-applicant.component.html',
    styleUrls: ['./single-applicant.component.scss']
})
export class SingleApplicantComponent implements OnInit {

    @Input() applicant: IApplication;
    constructor() {
    }

    ngOnInit(): void {
    }

}
