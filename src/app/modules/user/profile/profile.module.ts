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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { ExperienceComponent } from './experience/experience.component';

@NgModule({
    declarations: [ProfileComponent, ExperienceComponent],
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
    ],
})
export class ProfileModule {}
