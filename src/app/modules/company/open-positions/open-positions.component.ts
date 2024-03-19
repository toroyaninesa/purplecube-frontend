import { Component, OnInit } from '@angular/core';
import {JobsService} from "../../../service/jobs.service";
import {IJob} from "../../../models/job.model";
import {NavigationService} from "../../../core/navigation/navigation.service";

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.scss']
})
export class OpenPositionsComponent implements OnInit {

    jobs: IJob[] =[];
  constructor(
      private _jobService: JobsService,
      private _nav: NavigationService
  ) { }

  ngOnInit(): void {
      this._nav.page = 'Open Positions';
      this._jobService.getCompanyPositions()
          .subscribe((jobs) => {
              this.jobs = jobs;
          })
  }

}
