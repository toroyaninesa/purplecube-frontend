import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';
import {ICreateCompanyDto, ICompany} from '../models/company.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CompanyService {
  constructor(private _httpClient: HttpClient) {}

  createCompany(company: ICreateCompanyDto): Observable<ICompany> {
    const url = Location.joinWithSlash(
      environment.baseURL || '',
      '/company/'
    );

    return this._httpClient.post<ICompany>(url,company);
  }

  updateCompany(company: ICompany): Observable<ICompany> {
    const url = Location.joinWithSlash(
      environment.baseURL || '',
      '/company/' + company.id
    );

    return this._httpClient.put<ICompany>(url,company);
  }
}
