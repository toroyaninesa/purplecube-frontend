import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { profileRoutes } from './profile.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        MatDividerModule,
        RouterModule.forChild(profileRoutes),
        MatButtonModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
    ],
})
export class ProfileModule {}
