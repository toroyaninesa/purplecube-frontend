import {Component, Input, OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
    @Input() workExperienceForm: FormGroup;
  constructor(  ) { }

  ngOnInit(): void {
  }

}
