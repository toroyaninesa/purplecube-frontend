import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../../core/navigation/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _nav: NavigationService) {

  }

  ngOnInit(): void {
      setTimeout(() => {
          this._nav.page = 'Profile';
      });
  }

}
