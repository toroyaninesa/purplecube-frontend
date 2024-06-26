import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {JobsService} from '../../../../service/jobs.service';
import {IApplication} from '../../../../models/application.model';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NavigationService} from '../../../../core/navigation/navigation.service';
import {switchMap} from 'rxjs';

@Component({
    selector: 'app-applicants',
    templateUrl: './applicants.component.html',
    styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'id',
        'applicant',
        'email',
        'job',
        'similarity',
    ];
    // @ts-ignore
    dataSource: MatTableDataSource<IApplication>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    applicants: IApplication[];
    isSimilarityScoreLoading: boolean = true;

    constructor(
        private _jobService: JobsService,
        private _route: ActivatedRoute,
        private _nav: NavigationService
    ) {}

    ngAfterViewInit(): void {}

  ngOnInit(): void {
    this._nav.page = 'Applicants';
    this._route.paramMap.pipe(
      switchMap((paramMap) => {
        const jobId = +paramMap.get('id');
        return this._jobService.getJobApplicants(jobId);
      })
    ).subscribe((applicants: IApplication[]) => {
      this.applicants = applicants;
      this.dataSource = new MatTableDataSource(applicants);
      this.dataSource.paginator = this.paginator;

      this._jobService.getSimilarityScores(applicants.map(value => value.id)).subscribe(
        (similarityScores) => {
          this.isSimilarityScoreLoading = false;
          this.applicants.forEach((applicant) => {
            const id = applicant.id;
            if (similarityScores.hasOwnProperty(id)) {
              applicant.similarityScore =similarityScores[id]?.score;
            }
          });
          this.dataSource = new MatTableDataSource(this.applicants);
          this.dataSource.paginator = this.paginator;
        }
      );
    });
  }

  convertToPercentage(score: number | null | undefined): string {
      return score ? Math.round(score * 100) + '%' : 'N/A';
  }
}
