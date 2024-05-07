import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, take} from 'rxjs';

@Component({
  selector: 'app-rejection-modal',
  templateUrl: './rejection-modal.component.html',
  styleUrls: ['./rejection-modal.component.scss']
})
export class RejectionModalComponent implements OnInit {

  message = '';

  readonly url = 'https://api.openai.com/v1/chat/completions';
  constructor(private dialogRef: MatDialogRef<RejectionModalComponent>,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.generateRejectionMessage('Anna', 'Regional Director')
      .pipe(take(1)).subscribe((response) => {
      this.message = response.choices[0].message.content;
    });
  }

  generateRejectionMessage(candidateName: string, position: string): Observable<any> {
    const body = {
      'model': 'gpt-4',
      'messages': [
        {'role': 'user',
          'content': `Write a job rejection message to person named ${candidateName}, for applying to position ${position} and the reason is lack of experience`}],
      'temperature': 0.7
    };

    return this.httpClient.post(this.url, body,
      { headers : {
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
