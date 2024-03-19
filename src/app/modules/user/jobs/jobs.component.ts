import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../service/jobs.service';
import {
    EmploymentLevelEnum,
    EmploymentTypeEnum,
    ICategory,
    IJob,
} from '../../../models/job.model';
import { UserService } from '../../../core/user/user.service';
import { User } from '../../../core/user/user.types';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from '../../../core/navigation/navigation.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
    jobs: IJob[] = [];
    count: number;
    user: User;
    employment = EmploymentTypeEnum;
    level = EmploymentLevelEnum;
    categories: ICategory[];
    empFilter: string[] = [];
    levelFilter: string[] = [];
    catFilter: string[] = [];
    title: string;

    constructor(
        private jobService: JobsService,
        private userService: UserService,
        private _nav: NavigationService
    ) {}

    ngOnInit(): void {
        this._nav.page = 'Find Jobs';
        this.userService.user$.subscribe((res) => {
            this.user = res;
        });
        this.jobService.getJobs(0, 15).subscribe((res) => {
            this.jobs = res.jobs;
            this.count = res.count;
        });
        this.jobService.getAllCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    checkSaved(job: IJob): boolean {
        return (
            this.user.saved_jobs.filter((savedJob) => savedJob.id === job.id)
                .length >= 1
        );
    }

    employmentChange(e: MatCheckboxChange): void {
        if (
            e.checked &&
            this.empFilter.filter((type) => type === e.source.value).length < 1
        ) {
            this.empFilter.push(e.source.value);
        } else {
            this.empFilter = this.empFilter.filter(
                (type) => type !== e.source.value
            );
        }
    }

    levelChange(e: MatCheckboxChange): void {
        if (
            e.checked &&
            this.levelFilter.filter((type) => type === e.source.value).length <
                1
        ) {
            this.levelFilter.push(e.source.value);
        } else {
            this.levelFilter = this.levelFilter.filter(
                (type) => type !== e.source.value
            );
        }
    }

    categoryChange(e: MatCheckboxChange): void {
        if (
            e.checked &&
            this.catFilter.filter((type) => type === e.source.value).length < 1
        ) {
            this.catFilter.push(e.source.value);
        } else {
            this.catFilter = this.catFilter.filter(
                (type) => type !== e.source.value
            );
        }
    }

    search(): void {
        this.jobService
            .getJobs(
                0,
                15,
                this.title,
                this.empFilter,
                this.levelFilter,
                this.catFilter
            )
            .subscribe((res) => {
                this.jobs = res.jobs;
                this.count = res.count;
            });
    }

    handlePageEvent(e: PageEvent): void {
        this.jobService
            .getJobs(
                e.pageIndex * 15,
                e.pageIndex * 15 + e.pageIndex + 15,
                this.title,
                this.empFilter,
                this.levelFilter
            )
            .subscribe((res) => {
                this.jobs = res.jobs;
            });
    }

    reset() {
        this.jobService.getJobs(0, 15).subscribe((res) => {
            this.jobs = res.jobs;
            this.count = res.count;
        });
    }
}
