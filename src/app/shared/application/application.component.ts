import {Component, Input, OnInit} from '@angular/core';
import {IApplication} from '../../models/application.model';
import {JobsService} from '../../service/jobs.service';
import {ActivatedRoute} from '@angular/router';
import {JobStage} from '../../models/job.model';
import {ApplicationService} from './application.service';
import { take} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {RejectionModalComponent} from '../rejection-modal/rejection-modal.component';

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
    readonly hireActionId = -200;


  constructor(
        private _jobService: JobsService,
        private _route: ActivatedRoute,
        private _applicationService: ApplicationService,
        private _bar: MatSnackBar,
        private _dialog: MatDialog,

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
        return currentStageId > stage.orderNumber || !this.isTheApplicationActive();
    }

    moveApplicationStatus(stageId: number ): void {
        this._applicationService.moveApplicationStatus(this.application.id, stageId)
            .pipe(take(1)).subscribe((result) => {
            this.application.currentStageId = result.currentStageId;
        });
    }

    rejectApplication(): void {
      const dialog = this._dialog.open(RejectionModalComponent, {
        height: '450px',
        width: '650px'
      });

      dialog.afterClosed().pipe(take(1))
        .subscribe((data) => {
        if(data.reject) {
          this._applicationService
            .moveApplicationStatus(this.application.id, this.rejectionActionId, data.message)
            .pipe(take(1))
            .subscribe((result) => {
              this.application.currentStageId = result.currentStageId;
            });
        }
      });
    }

    isTheApplicantHired(): boolean {
    return this.application.currentStageId === this.hireActionId;
    }

  isTheApplicantRejected(): boolean {
    return this.application.currentStageId === this.rejectionActionId;
  }

    getStepMessage(stage: JobStage): string {
        return this.isAdminUser ? ' Hi! Please carefully take a look at the applicant\n' +
            '                        profile and choose the appropriate actions from the below list!'
            : stage.stageMessage;
    }

  isTheApplicationActive(): boolean {
    return !(this.isTheApplicantRejected() || this.isTheApplicantHired());
  }
}
