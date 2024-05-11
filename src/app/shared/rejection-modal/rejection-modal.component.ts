import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, take} from 'rxjs';
import {IApplication} from '../../models/application.model';

@Component({
  selector: 'app-rejection-modal',
  templateUrl: './rejection-modal.component.html',
  styleUrls: ['./rejection-modal.component.scss']
})
export class RejectionModalComponent implements OnInit {

  message: string = '';
  reason: string;

  readonly url = 'https://api.openai.com/v1/chat/completions';
  constructor(private dialogRef: MatDialogRef<RejectionModalComponent>,
              private httpClient: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: { application: IApplication }
  ) { }

  ngOnInit(): void {
  }


  requestRejectionMessage(): void {
    const application = this.data.application;
    const applicantNameSurname = application.user.name + '' + application.user.surname;
    this.generateRejectionMessage(applicantNameSurname, application.job.title, this.reason)
      .pipe(take(1)).subscribe((response) => {
      this.message = response.choices[0].message.content;
    });
  }

  generateRejectionMessage(candidateName: string, position: string, reason: string): Observable<any> {
    const body = {
      'model': 'gpt-4',
      'messages': [
        {'role': 'user',
          'content':
            `Write a job rejection message to person named ${candidateName},
            for applying to position ${position}
            and the reason is ${reason},
            don't include company information`}],
      'temperature': 0.7
    };

    return this.httpClient.post(this.url, body,
      { headers : {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Authorization': environment.gptAuthHeader,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'OpenAI-Organization': environment.gptOrg,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'OpenAI-Project': environment.gptProject
      }});
  }

  reject(): void {
    this.dialogRef.close({
      reject: true,
      message: this.message
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
