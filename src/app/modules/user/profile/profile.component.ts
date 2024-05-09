import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../core/navigation/navigation.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../service/profile.service';
import {CreateExperience, IExperience} from '../../../core/user/user.types';
import {NavigationEnd, Router} from '@angular/router';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    formGroups: FormGroup[] = [];
    experienceList: IExperience[];


    constructor(
        private _nav: NavigationService,
        private formBuilder: FormBuilder,
        private profileService: ProfileService,
        private router: Router
    ) {
    }


    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this._nav.page = 'Profile';
            }
        });

        this.profileService.getExperience().subscribe(response => this.experienceList = response,
        );
        this.onAdd();
    }

    onAdd(): void {
        this.formGroups.push(this.formBuilder.group({
                    companyName: new FormControl('', [Validators.required]),
                    positionTitle: new FormControl('', [Validators.required]),
                    description: new FormControl('', [Validators.required]),
                    startDate: [''],
                    endDate: [''],
                },
            ),
        );
    }

    onSave(): void {
        if (this.formGroups.some(value => value.invalid)) {
            return;
        }
        const experienceList: CreateExperience[] = [];
        this.formGroups.forEach(form => experienceList.push(
            {
                companyName: form.value.companyName,
                positionTitle: form.value.positionTitle,
                description: form.value.description,
                startDate: new Date(form.value.startDate),
                endDate: new Date(form.value.endDate)
            },
        ));
        this.profileService.saveUserProfile(experienceList).subscribe(
            (response) => {
                this.experienceList.push(...response);
                this.formGroups = [];
                this.onAdd();
            },
        );
    }

    onDelete(id: number): void {
        this.profileService.deleteExperience(id).subscribe(
            (res) => {
                if (res) {
                    this.experienceList = this.experienceList.filter(item => item.id !== id);
                }
            },
        );
    }
}
