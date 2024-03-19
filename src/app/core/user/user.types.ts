import { IJob } from '../../models/job.model';
import { IUserRole } from '../../models/user.model';

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    avatar?: string;
    status?: string;
    saved_jobs: IJob[];
    role: IUserRole;
    experience: IExperience[];
}

export interface IExperience {
    id: number;
    companyName: string;
    positionTitle: string;
    description: string;
    startDate: Date;
    endDate: Date;
}
