import {Component, OnInit} from '@angular/core';
import {JobsService} from '../../../service/jobs.service';
import {EmploymentLevelEnum, EmploymentTypeEnum, ICategory, IJob} from '../../../models/job.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NavigationService} from '../../../core/navigation/navigation.service';

@Component({
    selector: 'app-new-vacancy',
    templateUrl: './new-vacancy.component.html',
    styleUrls: ['./new-vacancy.component.scss'],
})
export class NewVacancyComponent implements OnInit {
    description: any;
    title: string;
    employment = EmploymentTypeEnum;
    level = EmploymentLevelEnum;
    categories: ICategory[];
  jobStages: UntypedFormGroup[] = [this._builder.group(
    {
        stageTitle:new FormControl('', [Validators.required]),
        stagePrefix: new FormControl('', [Validators.required]),
        stageMessage: new FormControl('', [Validators.required]),
      },
    ),
  ];
  newJob = this._builder.group({
        job: this._builder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            max_applications: 10,
            level: [''],
            employment: [''],
        }),
        categories: [''],
    });

    constructor(
        private _jobService: JobsService,
        private _bar: MatSnackBar,
        private _builder: UntypedFormBuilder,
        private _nav: NavigationService
    ) {}

    ngOnInit(): void {
        this._nav.page = 'New Vacancy';
        this._jobService.getAllCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

  onAddStage(): void {
    this.jobStages.push(
      this._builder.group(
        {
          stageTitle: new FormControl('', [Validators.required]),
          stagePrefix: new FormControl('', [Validators.required]),
          stageMessage: new FormControl('', [Validators.required]),
        },
      ),
    );
  }

  createJob(): void {
    if (this.newJob.invalid && this.jobStages.some(value => value.invalid)) {
      return;
    }

    this._jobService
      .createJob({
        ...this.newJob.getRawValue(), jobStages: this.jobStages.map((stage, index: number) => ({
          ...stage.getRawValue(),
          orderNumber: index,
        }))
      })
                .subscribe((res: IJob) => {
                    if (res.id) {
                        this._bar.open(
                            'You have successfully created the job!',
                            '',
                            {
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                                duration: 3000,
                                panelClass: ['snackbar'],
                            }
                        );
                        this.newJob.reset();
                      this.jobStages = [this._builder.group(
                        [{
                          stageTitle: ['', Validators.required],
                          stagePrefix: ['', Validators.required],
                          stageMessage: ['', Validators.required],
                        }]
                      )];
                    }
                });

  }
}
