import { ICompany } from './company.model';

export interface IJob {
    id: number;
    title: string;
    description: string;
    max_applications: number;
    no_applicants: number;
    company: ICompany;
    employment: EmploymentTypeEnum;
    level: EmploymentLevelEnum;
    categories: { id: number; title: string }[];
}

export enum EmploymentTypeEnum {
    FULL_TIME = 'F',
    PART_TIME = 'P',
    CONTRACT = 'C',
    SHIFTS = 'S',
}

export enum EmploymentLevelEnum {
    ENTRY = 'E',
    JUNIOR = 'J',
    MIDDLE = 'M',
    SENIOR = 'S',
}

export interface ICategory {
    id: number;
    title: string;
}
