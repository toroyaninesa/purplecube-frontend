import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyComponent } from './my-company.component';
import { Route, RouterModule } from '@angular/router';
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../../../shared/shared.module";

const myCompanyRoutes: Route[] = [
    {
        path: '',
        component: MyCompanyComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    declarations: [MyCompanyComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(myCompanyRoutes),
      FuseAlertModule,
      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatProgressSpinnerModule,
      SharedModule,
    ],
})
export class MyCompanyModule {}
