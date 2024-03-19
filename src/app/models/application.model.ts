import {User} from '../core/user/user.types';
import {IJob} from "./job.model";

export interface IApplication {
    id: number;
    hired: boolean;
    status: EStatus;
    user: User;
    job: IJob;
}

export enum EStatus {
    SUBMITTED = "SUBMITTED",
    SCREENING = "SCREENING",
    DECISION  = "DECISION"

}
