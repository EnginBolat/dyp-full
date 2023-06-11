import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthModel } from 'src/app/models/auth-model';
import { GroupModel } from 'src/app/models/group-model';
import { MainModel } from 'src/app/models/main-model';
import { ApiService } from 'src/app/services/api.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.css'],
})
export class GroupDialogComponent implements OnInit {
  dialogTitle?: string;
  process?: string;
  frm!: FormGroup;
  newRecord: GroupModel = new GroupModel();
  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public frmBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.process = data.process;
    this.newRecord = data.newRecord;
    if (this.process == 'add') {
      this.dialogTitle = 'Grup Ekle';
      this.frm = this.CreateForm()
    } else if (this.process == 'edit') {
      this.dialogTitle = 'Grup Düzenle';
      this.frm = this.EditForm();
    }
  }

  ngOnInit() {}

  CreateForm() {
    return this.frmBuilder.group({
      groupName: [this.newRecord.groupName],
    });
  }

  EditForm() {
    return this.frmBuilder.group({
      Id: [this.newRecord.Id],
      groupName: [this.newRecord.groupName],
    });
  }
}
