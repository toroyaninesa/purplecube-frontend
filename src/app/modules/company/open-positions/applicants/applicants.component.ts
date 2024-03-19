import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { JobsService } from '../../../../service/jobs.service';
import { IApplication } from '../../../../models/application.model';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationService } from '../../../../core/navigation/navigation.service';

@Component({
    selector: 'app-applicants',
    templateUrl: './applicants.component.html',
    styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'id',
        'applicant',
        'email',
        'hired',
        'status',
        'job',
        'napplicants',
    ];
    // @ts-ignore
    dataSource: MatTableDataSource<IApplication>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    applicants: IApplication[];

    constructor(
        private _jobService: JobsService,
        private _route: ActivatedRoute,
        private _nav: NavigationService
    ) {}

    ngAfterViewInit(): void {}

    ngOnInit(): void {
        this._nav.page = 'Applicants';
        this._jobService
            .getJobApplicants(+this._route.snapshot.paramMap.get('id'))
            .subscribe((applicants: IApplication[]) => {
                this.applicants = applicants;
                this.dataSource = new MatTableDataSource(applicants);
                this.dataSource.paginator = this.paginator;
            });
    }
}
