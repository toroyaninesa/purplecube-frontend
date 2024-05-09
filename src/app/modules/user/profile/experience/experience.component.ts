import {Component, Input} from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
    @Input() workExperienceForm: FormGroup;
  constructor(  ) { }

}
