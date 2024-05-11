import { IJob } from './job.model';
import { IUserRole } from '../core/user/user.types';
import {ICompany} from "./company.model";

export interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    avatar?: string;
    status?: string;
    company?: ICompany;
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
export interface ICreateExperience {
    companyName: string;
    positionTitle: string;
    description?: string;
    startDate: Date | null;
    endDate: Date | null;
}
