import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from '../../user/user.service';
import {of, switchMap, take} from 'rxjs';
import {IUser} from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    return this.userService.user$.pipe(
      take(1),
      switchMap((user: IUser) => {
        if (user && user.company) {
          // User has a company
          return of(true); // Allow access to the route
        } else {
          // User doesn't have a company
          this.router.navigate(['/some-path']); // Navigate to a different path if the user doesn't have a company
          return of(false); // Prevent access to the route
        }
      })
    ).toPromise();
  }
}
