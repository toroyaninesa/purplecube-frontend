import { User } from '../core/user/user.types';
import {IJob, JobStage} from './job.model';

export interface IApplication {
    id: number;
    hired: boolean;
    currentStageId: number;
    user: User;
    job: IJob;
}

export enum EStatus {
    SUBMITTED = 'SUBMITTED',
    SCREENING = 'SCREENING',
    DECISION = 'DECISION',
    REJECTED = 'REJECTED'
}
