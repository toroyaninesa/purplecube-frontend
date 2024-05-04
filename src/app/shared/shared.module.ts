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
import { ExperiencePreviewComponent } from './experience-preview/experience-preview.component';
import {MatStepperModule} from '@angular/material/stepper';

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
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        JobPostingComponent,
        JobLevelPipe,
        JobTypePipe,
        HeaderComponent,
        ExperiencePreviewComponent,
    ],
    declarations: [
        JobPostingComponent,
        JobLevelPipe,
        JobTypePipe,
        HeaderComponent,
        ExperiencePreviewComponent,
    ],
})
export class SharedModule {}
