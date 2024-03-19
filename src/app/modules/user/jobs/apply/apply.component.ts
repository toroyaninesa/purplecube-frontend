import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ApplyComponent>,
  ) { }

  ngOnInit(): void {
  }

    apply() {
        this.dialogRef.close(true);
    }
}
