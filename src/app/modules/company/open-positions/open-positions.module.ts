import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenPositionsComponent } from './open-positions.component';
import { Route, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../../../shared/shared.module';
import { ApplicantsComponent } from './applicants/applicants.component';
import { SingleApplicantComponent } from './applicants/single-applicant/single-applicant.component';
import { MatButtonModule } from '@angular/material/button';
import { CompanyUserApplicationComponent } from './application/company-user-application.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

export const openPositionsRoutes: Route[] = [
    {
        path: '',
        component: OpenPositionsComponent,
    },
    {
        path: ':id/applicants',
        pathMatch: 'full',
        component: ApplicantsComponent,
    },
    {
        path: ':id/applicants/:id',
        pathMatch: 'full',
        component: CompanyUserApplicationComponent,
    },
];

@NgModule({
    declarations: [
        OpenPositionsComponent,
        ApplicantsComponent,
        SingleApplicantComponent,
        CompanyUserApplicationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(openPositionsRoutes),
        MatDividerModule,
        SharedModule,
        MatButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
    ],
})
export class OpenPositionsModule {}
