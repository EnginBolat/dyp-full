import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthModel } from 'src/app/models/auth-model';
import { GroupModel } from 'src/app/models/group-model';
import { MainModel } from 'src/app/models/main-model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent implements OnInit {
  dialogTitle?: string;
  process?: string;
  frm!: FormGroup;
  newRecord: MainModel = new MainModel();
  authList: AuthModel[] = [];
  groupList: GroupModel[] = [];
  selectedAuth?: string;
  selectedGroup?: string;
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
      this.dialogTitle = 'Üye Ekle';
      this.frm = this.CreateUserForm();
    } else if (this.process == 'edit') {
      this.dialogTitle = 'Üye Düzenle';
      this.frm = this.EditUserForm();
    }
    
  }

  ngOnInit() {
    this.GetGroupList();
    this.GetAuthList();
  }

  GetAuthList() {
    this.apiService.ListOfAuth().subscribe((p: AuthModel[]) => {
      this.authList = p;
    });
  }

  GetGroupList() {
    this.apiService.ListOfGroups().subscribe((p: GroupModel[]) => {
      this.groupList = p;
    });
  }

  CreateUserForm() {
    return this.frmBuilder.group({
      Id: [this.newRecord.Id],
      userNameSurname: [this.newRecord.userNameSurname],
      userEmail: [this.newRecord.userEmail],
      userPassword: [this.newRecord.userPassword],
      userAuthority: [this.newRecord.userAuthority],
      userGroup: [this.newRecord.userGroup],
    });
  }

  EditUserForm() {
    const form = this.frmBuilder.group({
      Id: [this.newRecord.Id],
      userNameSurname: [this.newRecord.userNameSurname],
      userEmail: [this.newRecord.userEmail],
      userPassword: [this.newRecord.userPassword],
      userAuthority: [this.newRecord.userAuthority],
      userGroup: [this.newRecord.userGroup],
    });

    form.patchValue({
      userGroup: this.newRecord.userGroup,
    });

    return form;
  }
}
