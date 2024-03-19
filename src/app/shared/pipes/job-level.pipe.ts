import { Pipe, PipeTransform } from '@angular/core';
import { EmploymentLevelEnum } from '../../models/job.model';

@Pipe({
    name: 'jobLevel',
})
export class JobLevelPipe implements PipeTransform {
    transform(value: EmploymentLevelEnum): string {
        if (value === EmploymentLevelEnum.ENTRY) {
            return 'Entry level';
        }
        if (value === EmploymentLevelEnum.JUNIOR) {
            return 'Junior level';
        }
        if (value === EmploymentLevelEnum.MIDDLE) {
            return 'Middle level';
        }
        if (value === EmploymentLevelEnum.SENIOR) {
            return 'Senior level';
        }
    }
}
