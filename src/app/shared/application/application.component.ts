import {Component, Input, OnInit} from '@angular/core';
import {IApplication} from '../../models/application.model';
import {JobsService} from '../../service/jobs.service';
import {ActivatedRoute} from '@angular/router';
import {JobStage} from '../../models/job.model';

@Component({
  selector: 'app-single-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
    @Input() application: IApplication;
    @Input() isAdminUser: boolean;

    readonly rejectionActionId = -500;

    constructor(
        private _jobService: JobsService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
    }

    findCurrentStageId(): number {
        const currentStageId = this.application?.currentStageId;
        return currentStageId === 0 ? 0 : currentStageId - 1;
    }

    determineNextAction(): JobStage {
        const currentStageId = this.application.currentStageId;
        return this.application.job.jobStages.find(stage => stage.orderNumber === currentStageId + 1);
    }

    isTheStageCompleted(application, stage: JobStage): boolean {
        const currentStageId = this.application?.currentStageId;
        return currentStageId > stage.orderNumber;
    }

    moveApplicationStatus(actionId: number ): void {

    }

    getStepMessage(stage: JobStage): string {
        return this.isAdminUser ? ' Hi! Please carefully take a look at the applicant\n' +
            '                        profile and choose the appropriate actions from the below list!'
            : stage.stageMessage;
    }
}
