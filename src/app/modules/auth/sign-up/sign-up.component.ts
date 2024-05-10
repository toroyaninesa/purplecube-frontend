import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import {catchError, EMPTY, tap} from 'rxjs';
import {IUserRole} from '../../../core/user/user.types';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    roles = Object.values(IUserRole);

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            role:[IUserRole.USER,Validators.required],
            agreements: ['', Validators.requiredTrue],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

  roleLabel(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  /**
   * Sign up
   */
  signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
    this._authService.signUp(this.signUpForm.value).pipe(
      tap(() => this._router.navigateByUrl('/sign-in'),
        catchError(() => {
        this.signUpForm.enable();

        // Reset the form
        this.signUpNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: 'error',
          message: 'Something went wrong, please try again.',
        };

        // Show the alert
        this.showAlert = true;
            return EMPTY; // Or any other observable you want to return
          },
        )
      ),
    ).subscribe();

  }
}
