import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../../../core/navigation/navigation.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../@fuse/components/alert';
import {UserService} from '../../../core/user/user.service';
import {IUser} from '../../../models/user.model';
import {tap} from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  @ViewChild('userNgForm') companyNgForm: NgForm;
  userForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  user: IUser;

  constructor(
    private _nav: NavigationService,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this.userForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this._userService.user$.pipe(tap((user: IUser) => {
      this.user = user;
      this.userForm.setValue({
        name: user.name,
        surname: user.surname,
        email: user.email,
      });
    })).subscribe();
    this._nav.page = 'Settings';
  }

  onSave(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.userForm.disable();
    this._userService.updateUserInfo({...this.user, ...this.userForm.value})
      .subscribe(() => {
          this.userForm.enable();
        },
      );

  }

}
