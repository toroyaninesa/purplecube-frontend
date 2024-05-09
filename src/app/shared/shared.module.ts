import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { JobLevelPipe } from './pipes/job-level.pipe';
import { JobTypePipe } from './pipes/job-type.pipe';
import { HeaderComponent } from './header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { ApplicationComponent } from './application/application.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import { RejectionModalComponent } from './rejection-modal/rejection-modal.component';
import {MatInputModule} from '@angular/material/input';
import { ExperiencePreviewComponent } from './experience-preview/experience-preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDividerModule,
    MatStepperModule,
    MatChipsModule,
    MatInputModule,
  ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        JobPostingComponent,
        JobLevelPipe,
        JobTypePipe,
        HeaderComponent,
        ApplicationComponent,
        ExperiencePreviewComponent,
    ],
    declarations: [
        JobPostingComponent,
        JobLevelPipe,
        JobTypePipe,
        HeaderComponent,
        ApplicationComponent,
        RejectionModalComponent,
        ExperiencePreviewComponent,
    ],
})
export class SharedModule {}
