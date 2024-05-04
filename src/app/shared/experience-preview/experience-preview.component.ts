import {Component, Input, OnInit, Output} from '@angular/core';
import {IExperience} from '../../core/user/user.types';
import {ProfileService} from "../../service/profile.service";

@Component({
    selector: 'app-experience-preview',
    templateUrl: './experience-preview.component.html',
    styleUrls: ['./experience-preview.component.scss']
})
export class ExperiencePreviewComponent implements OnInit {

    @Input() experienceList: IExperience[];
    @Input() onDelete: (id: number) => void;

    constructor( private profileService: ProfileService) {
    }

    ngOnInit(): void {
    }

}
