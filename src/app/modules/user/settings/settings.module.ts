import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import {settingsRoutes} from './settings.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        MatDividerModule,
        RouterModule.forChild(settingsRoutes),
        MatButtonModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
    ],
})
export class SettingsModule {}
