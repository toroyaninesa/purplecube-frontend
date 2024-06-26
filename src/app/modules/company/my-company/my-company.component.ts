import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../core/navigation/navigation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; // Updated import
import {CompanyService} from '../../../service/company.service';
import {UserService} from '../../../core/user/user.service';
import {catchError, first} from 'rxjs';
import {IUser} from '../../../models/user.model';
import {ICompany} from '../../../models/company.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss'],
})
export class MyCompanyComponent implements OnInit {
  companyForm: FormGroup;
  isCompanyAvailable: boolean = false;
  private _company: ICompany;

  constructor(
    private _nav: NavigationService,
    private _userService: UserService,
    private companyService: CompanyService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.companyForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      image_url: [''],
    });

    this._userService.user$.pipe(first()).subscribe((user: IUser) => {
      this._company =user.company;
      this.companyForm.setValue({
        name: user.company.name,
        email: user.company.email,
        description: user.company.description,
        image_url: user.company.image_url,
      });
      this.isCompanyAvailable = true;
    });
    this._nav.page = 'My Company';
  }

  onCreate(): void {
    if (this.companyForm.invalid) {
      return;
    }
    this.companyForm.disable();
    const company: ICompany = {...this._company, ...this.companyForm.value};
    this.companyService.createCompany(company).pipe(
      catchError((err) => {
          this.companyForm.enable();
          this._snackBar.open(
            'Something went wrong, please try again.',
            'Close',
            {
              panelClass: ['error-snackbar'],
              duration: 3000,
            },
          );
          return err;
        },
      ),
    ).subscribe((result: ICompany) => {
        this._company = result;
        this.companyForm.enable();
        this.isCompanyAvailable = true;
        this._userService.company = result;
      },
    );
  }

  onUpdate(): void {
    if (this.companyForm.invalid) {
      return;
    }
    this.companyForm.disable();
    const company: ICompany = {...this._company, ...this.companyForm.value};
    this.companyService.updateCompany(company).pipe(
      catchError((err) => {
        this.companyForm.enable();
        this._snackBar.open(
          'Something went wrong, please try again.',
          'Close',
          {
            panelClass: ['error-snackbar'],
            duration: 3000,
          },
        );
          return err;
        },
      ),
    ).subscribe((result: ICompany) => {
        this._company = result;
        this.companyForm.enable();
        this.isCompanyAvailable = true;
        this._userService.company = result;
      },
    );
  }

}
