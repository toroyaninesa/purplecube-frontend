import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobsService} from '../../../../service/jobs.service';
import {IJob} from '../../../../models/job.model';
import {UserService} from '../../../../core/user/user.service';
import {User} from '../../../../core/user/user.types';
import {MatDialog} from '@angular/material/dialog';
import {ApplyComponent} from '../apply/apply.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-single-job',
    templateUrl: './single-job.component.html',
    styleUrls: ['./single-job.component.scss']
})
export class SingleJobComponent implements OnInit {

    jobId: number;
    job: IJob;
    user: User;

    constructor(
        private _route: ActivatedRoute,
        private _jobService: JobsService,
        private _userService: UserService,
        private _dialog: MatDialog,
        private _bar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this._route.params.subscribe((params) => {
            this.jobId = params['id'];
            this._jobService.getJobById(this.jobId)
                .subscribe((job) => {
                   this.job = job;
                });
        });
        this._userService.user$.subscribe((user) => {
            this.user = user;
        });
    }

    apply(id: number) {
        const applyBox = this._dialog.open(ApplyComponent);
        applyBox.afterClosed().subscribe((result: boolean) => {
            this._userService.applyToJob(id)
                .subscribe((res) => {
                    this._bar.open('You have successfully applied to the job!', '', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 3000,
                        panelClass: ['snackbar']
                    });
                    this.job.no_applicants +=1;
                }, (error) => {
                    this._bar.open('You have already applied to this job! ', '', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 3000,
                        panelClass: ['snackbar']
                    });
                });
        });
    }
}
