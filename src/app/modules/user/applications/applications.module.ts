import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserApplicationsComponent } from './user-applications.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { applicationsRoutes } from './applications.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [UserApplicationsComponent],
    imports: [
        CommonModule,
        MatDividerModule,
        RouterModule.forChild(applicationsRoutes),
        MatButtonModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
    ],
})
export class ApplicationsModule {}
