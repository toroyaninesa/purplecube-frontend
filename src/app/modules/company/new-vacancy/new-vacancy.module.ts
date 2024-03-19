import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewVacancyComponent } from './new-vacancy.component';
import { Route, RouterModule } from '@angular/router';
import { SavedJobsComponent } from '../../user/saved-jobs/saved-jobs.component';
import { MatDividerModule } from '@angular/material/divider';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';

export const newVacancyRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: NewVacancyComponent,
    },
];

@NgModule({
    declarations: [NewVacancyComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(newVacancyRoutes),
        MatDividerModule,
        EditorModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class NewVacancyModule {}
