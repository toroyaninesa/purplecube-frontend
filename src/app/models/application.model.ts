import { User } from '../core/user/user.types';
import {IJob} from './job.model';

export interface IApplication {
    id: number;
    hired: boolean;
    currentStageId: number;
    user: User;
    job: IJob;
    finalStageMessage: string;
}
