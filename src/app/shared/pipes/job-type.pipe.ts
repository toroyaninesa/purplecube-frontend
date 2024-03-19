import {Pipe, PipeTransform} from '@angular/core';
import {EmploymentTypeEnum} from '../../models/job.model';

@Pipe({
    name: 'jobType'
})
export class JobTypePipe implements PipeTransform {

    transform(value: EmploymentTypeEnum): string {
        switch (value) {
            case EmploymentTypeEnum.CONTRACT:
                return 'Contract';
            case EmploymentTypeEnum.FULL_TIME:
                return 'Full-time';
            case EmploymentTypeEnum.SHIFTS:
                return 'Shifts';
            case EmploymentTypeEnum.PART_TIME:
                return 'Part-time';
        }
    }

}
