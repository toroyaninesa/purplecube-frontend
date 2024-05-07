import {Component, Input, OnInit} from '@angular/core';
import {IApplication} from '../../models/application.model';
import {JobsService} from '../../service/jobs.service';
import {ActivatedRoute} from '@angular/router';
import {JobStage} from '../../models/job.model';
import {ApplicationService} from './application.service';
import { take} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
    @Input() application: IApplication;
    @Input() isAdminUser: boolean;

    public nextStage: JobStage;
    readonly rejectionActionId = -500;

    constructor(
        private _jobService: JobsService,
        private _route: ActivatedRoute,
        private _applicationService: ApplicationService,
        private _bar: MatSnackBar
    ) {}

    ngOnInit(): void {
    }

    findCurrentStageId(): number {
        const currentStageId = this.application?.currentStageId;
        return currentStageId === 0 ? 0 : currentStageId - 1;
    }

    determineNextAction(): JobStage {
        const currentStageId = this.application.currentStageId;
        this.nextStage = this.application.job.jobStages.find(stage => stage.orderNumber === currentStageId + 1);
        return this.nextStage;
    }

    isTheStageCompleted(application, stage: JobStage): boolean {
        const currentStageId = this.application?.currentStageId;
        return currentStageId > stage.orderNumber;
    }

    moveApplicationStatus(stageId: number ): void {
        this._applicationService.moveApplicationStatus(this.application.id, stageId)
            .pipe(take(1)).subscribe((result) => {
            this.application.currentStageId = result.currentStageId;
        });
    }

    getStepMessage(stage: JobStage): string {
        return this.isAdminUser ? ' Hi! Please carefully take a look at the applicant\n' +
            '                        profile and choose the appropriate actions from the below list!'
            : stage.stageMessage;
    }
}
