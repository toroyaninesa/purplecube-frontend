import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../../../core/navigation/navigation.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'; // Updated import
import {CompanyService} from '../../../service/company.service';
import {FuseAlertType} from '../../../../@fuse/components/alert';
import {UserService} from '../../../core/user/user.service';
import {first, tap} from 'rxjs';
import {IUser} from '../../../models/user.model';
import {ICompany} from '../../../models/company.model';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss'],
})
export class MyCompanyComponent implements OnInit {
  @ViewChild('companyNgForm') companyNgForm: NgForm; // Updated ViewChild import
  companyForm: FormGroup; // Updated form group import
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  isCompanyAvailable: boolean = false;
  private _company: ICompany;

  constructor(
    private _nav: NavigationService,
    private _userService: UserService,
    private companyService: CompanyService,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this.companyForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      image_url: [''],
    });

    this._userService.user$.pipe(tap((user: IUser) => {
      this._company =user.company;
      this.companyForm.setValue({
        name: user.company.name,
        email: user.company.email,
        description: user.company.description,
        image_url: user.company.image_url,
      });
      this.isCompanyAvailable = true;
    })).subscribe();
    this._nav.page = 'My Company';
  }

  onCreate(): void {
    if (this.companyForm.invalid) {
      return;
    }
    this.companyForm.disable();

    this.companyService.createCompany({...this.companyForm.value}).subscribe({
      next: (result) => {
        this._company = result;
        this.companyForm.enable();
        this.isCompanyAvailable = true;
        this._userService.user$.pipe(first()).subscribe((user: IUser) => {
          this._userService.user = {...user, company: result};
        });
      },
      error: () => {
        this.companyForm.enable();
        this.companyNgForm.resetForm();
        this.alert = {
          type: 'error',
          message: 'Something went wrong, please try again.',
        };
        this.showAlert = true;
      },
    });
  }

  onUpdate(): void {
    if (this.companyForm.invalid) {
      return;
    }
    this.companyForm.disable();
    const company: ICompany = {...this._company, ...this.companyForm.value};
    this.companyService.updateCompany(company).subscribe({
      next: (result: ICompany) => {
        this._company = result;
        this.companyForm.enable();
        this.isCompanyAvailable = true;
        this._userService.user$.pipe(first()).subscribe((user: IUser) => {
          this._userService.user = {...user, company: result};
        });
      },
      error: () => {
        this.companyForm.enable();
        this.companyNgForm.resetForm();
        this.alert = {
          type: 'error',
          message: 'Something went wrong, please try again.',
        };
        this.showAlert = true;
      },
    });
  }

}
