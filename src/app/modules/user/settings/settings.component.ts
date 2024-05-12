import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../../../core/navigation/navigation.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../../core/user/user.service';
import {IUser} from '../../../models/user.model';
import {take, tap} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  @ViewChild('userNgForm') userNgForm: NgForm;
  userForm: FormGroup;
  user: IUser;

  constructor(
    private _nav: NavigationService,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.userForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this._userService.user$.pipe(take(1)).subscribe((user: IUser) => {
      this.user = user;
      this.userForm.setValue({
        name: user.name,
        surname: user.surname,
        email: user.email,
      });
    });
    this._nav.page = 'Settings';
  }

  onSave(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.userForm.disable();
    this._userService.updateUserInfo({...this.user, ...this.userForm.value}).pipe(
      tap(
        () => this.userForm.enable(),
        () => {
          this._snackBar.open(
            'Something went wrong, please try again.',
            'Close',
            {
              panelClass: ['error-snackbar'],
              duration: 3000,
            },
          );
          this.userForm.enable();
          this.userNgForm.resetForm();
        },
      ),
    ).subscribe();

  }

}
