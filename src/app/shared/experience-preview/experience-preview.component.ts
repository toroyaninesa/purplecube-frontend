import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IExperience} from '../../models/user.model';

@Component({
    selector: 'app-experience-preview',
    templateUrl: './experience-preview.component.html',
    styleUrls: ['./experience-preview.component.scss']
})
export class ExperiencePreviewComponent {

    @Input() experienceList: IExperience[];
    @Output() delete: EventEmitter<number> =  new EventEmitter<number>();

    constructor( ) {}

  onDeleteExperience(id: number): void {
    this.delete.emit(id);
  }

}
