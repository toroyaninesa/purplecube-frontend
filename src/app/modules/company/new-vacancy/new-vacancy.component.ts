import {Component, OnInit, ViewChild} from '@angular/core';
import {EventObj} from '@tinymce/tinymce-angular/editor/Events';
import {getTinymce} from '@tinymce/tinymce-angular/TinyMCE';
import {JobsService} from '../../../service/jobs.service';
import {algo} from 'crypto-js';
import {EmploymentLevelEnum, EmploymentTypeEnum, ICategory, IJob} from '../../../models/job.model';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, Validators} from '@angular/forms';
import {NavigationService} from "../../../core/navigation/navigation.service";

@Component({
    selector: 'app-new-vacancy',
    templateUrl: './new-vacancy.component.html',
    styleUrls: ['./new-vacancy.component.scss']
})
export class NewVacancyComponent implements OnInit {
    description: any;
    title: string;
    maxApplications: number = 10;
    employment = EmploymentTypeEnum;
    level = EmploymentLevelEnum;
    selectedEmployment: EmploymentTypeEnum;
    selectedLevel: EmploymentLevelEnum;
    categories: ICategory[];
    selectedCats: number[];
    newJob = this._builder.group({
      job: this._builder.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          max_applications: 10,
          level: [''],
          employment: [''],
      }),
        categories: ['']
    });

    constructor(
        private _jobService: JobsService,
        private _bar: MatSnackBar,
        private _builder: FormBuilder,
        private _nav: NavigationService
    ) {
    }

    ngOnInit(): void {
        this._nav.page = 'New Vacancy';
        this._jobService.getAllCategories()
            .subscribe((cats) => {
                this.categories = cats;
            });
    }

    createJob(): void {
       if(this.newJob.valid) {
           this._jobService
               .createJob(this.newJob.getRawValue())
               .subscribe((res: IJob) => {
                   if (res.id) {
                       this._bar.open('You have successfully created the job!', '', {
                           horizontalPosition: 'center',
                           verticalPosition: 'top',
                           duration: 3000,
                           panelClass: ['snackbar']
                       });
                       this.newJob.reset();
                   }
               });
       }
    }
}
