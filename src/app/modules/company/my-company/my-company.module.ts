import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyComponent } from './my-company.component';
import {Route, RouterModule} from "@angular/router";

const myCompanyRoutes: Route[] = [
    {
        path: '',
        component: MyCompanyComponent,
        pathMatch: 'full'

    }
];

@NgModule({
  declarations: [
    MyCompanyComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild(myCompanyRoutes),
  ]
})
export class MyCompanyModule { }
