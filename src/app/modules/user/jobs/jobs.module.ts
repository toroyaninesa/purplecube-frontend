import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobsComponent} from './jobs.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {jobRoutes} from './jobs.routing';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SingleJobComponent} from './single-job/single-job.component';
import {SharedModule} from '../../../shared/shared.module';
import {CdkAccordionModule} from "@angular/cdk/accordion";
import { ApplyComponent } from './apply/apply.component';
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
    declarations: [
        JobsComponent,
        SingleJobComponent,
        ApplyComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        RouterModule.forChild(jobRoutes),
        MatDividerModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatCheckboxModule,
        SharedModule,
        CdkAccordionModule,
        MatPaginatorModule,
    ]
})
export class JobsModule {
}
