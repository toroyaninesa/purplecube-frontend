import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../core/navigation/navigation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    ) {}


    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this._nav.page = 'Profile';
            }
        });

        this.profileService.getExperience().subscribe({
            next: (response) => {
                console.log('HTTP request successful:', response);
                // Handle successful response
                //
                this.experienceList = response;
            },
            error: (error) => {
                console.error('HTTP request error:', error);
                // Handle error
            }
        });
        this.onAdd();
    }

    onAdd(): void {
        this.formGroups.push(this.formBuilder.group({
            companyName: ['', Validators.required],
            positionTitle: ['', Validators.required],
            description: ['', Validators.required],
            startDate: [''],
            endDate: [''],
        },),);
    }

    onSave(): void {
        //perform form validation and highlight the form with errors
        let isValid = true;
        this.formGroups.forEach((form, index) => {
            if (!form.valid) {
                this.markFormGroupTouched(this.formGroups[index]);
                isValid = false;
            }
        },);
        if (!isValid) {
            return;
        }
        const experienceList: CreateExperience[] = [];
        // Perform save operation if the form is valid
        this.formGroups.forEach(form => experienceList.push(
            {
                companyName: form.value.companyName,
                positionTitle: form.value.positionTitle,
                description: form.value.description,
                startDate: new Date(form.value.startDate),
                endDate: new Date(form.value.endDate)
            },
        ));
        this.profileService.saveUserProfile(experienceList).subscribe({
            next: (response) => {
                console.log('HTTP request successful:', response);
                // Handle successful response
                this.experienceList.push(...response);
                this.formGroups = [];
                this.onAdd();
            },
            error: (error) => {
                console.error('HTTP request error:', error);
                // Handle error
            }
        });
    }

    onDelete(id: number): void {
        console.log(this);
        console.log(`trying to delete ${id}`);
        this.profileService.deleteExperience(id).subscribe({
            next: () => {
                this.experienceList = this.experienceList.filter(item => item.id !== id);
            },
            error: (error) => {
                console.error('Failed to delete experience:', error);
            }
        });
    }

    // Helper function to mark all form fields as touched to display validation errors
    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        },);
    }
}
