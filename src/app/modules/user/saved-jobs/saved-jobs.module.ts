import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { savedJobsRoutes } from './savedJobs.routing';
import { SavedJobsComponent } from './saved-jobs.component';
import { MatDividerModule } from '@angular/material/divider';
import { JobsModule } from '../jobs/jobs.module';
import { LandingJobComponent } from '../jobs/landing-job/landing-job.component';
import { JobPostingComponent } from '../../../shared/job-posting/job-posting.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [SavedJobsComponent, LandingJobComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(savedJobsRoutes),
        MatDividerModule,
        SharedModule,
        //JobsModule
    ],
})
export class SavedJobsModule {}
