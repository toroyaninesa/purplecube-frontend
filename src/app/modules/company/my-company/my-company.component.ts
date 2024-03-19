import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../../../core/navigation/navigation.service";

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {

  constructor(private _nav: NavigationService) { }

  ngOnInit(): void {
      this._nav.page = "My Company";
  }

}
