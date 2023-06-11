import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent implements OnInit {
  dialogBaslik?: string;
  dialogIslem?: boolean;
  dialogMesaj?: string;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
  ) {}

  ngOnInit() {}
}
