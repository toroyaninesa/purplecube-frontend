import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/user/user.service';
import {IJob} from '../../../models/job.model';

@Component({
    selector: 'app-saved-jobs',
    templateUrl: './saved-jobs.component.html',
    styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent implements OnInit {
    jobs: IJob[];

    constructor(
        private _userService: UserService
    ) {
    }

    ngOnInit(): void {
        this._userService.getSavedJobs()
            .subscribe((jobs) => {
                this.jobs = jobs;
            });
    }

}
