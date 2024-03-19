import { Component, Input, OnInit } from '@angular/core';
import { IJob } from '../../models/job.model';
import { JobsService } from '../../service/jobs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user.types';

@Component({
    selector: 'app-job-posting',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.scss'],
})
export class JobPostingComponent implements OnInit {
    @Input() job: IJob;
    @Input() isSaved: boolean;
    @Input() showSave: boolean;
    @Input() showApply: boolean;
    @Input() showApplicants: boolean = false;
    user: User;
    constructor(
        private jobService: JobsService,
        private userService: UserService,
        private bar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.userService.user$.subscribe((res) => {
            this.user = res;
        });
    }

    saveJob(id: number): void {
        this.jobService.saveJobToUser(id, +this.user.id).subscribe(
            (res) => {
                this.bar.open('Successfully saved', '', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 3000,
                    panelClass: ['snackbar'],
                });
            },
            (error) => {
                this.bar.open("You can't save this job", '', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 3000,
                    panelClass: ['snackbar'],
                });
            }
        );
    }
}
