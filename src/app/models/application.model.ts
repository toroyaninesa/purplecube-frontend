import { IUser } from './user.model';
import {IJob} from './job.model';

export interface IApplication {
    id: number;
    hired: boolean;
    currentStageId: number;
    user: IUser;
    job: IJob;
    finalStageMessage: string;
    similarityScore?: number;
}
