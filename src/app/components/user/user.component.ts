import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainModel } from 'src/app/models/main-model';
import { UserModel } from 'src/app/models/user-model';
import { ApiService } from 'src/app/services/api.service';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { ResultModel } from 'src/app/models/result-model';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users?: MainModel[];
  displayedColumns = [
    'userNameSurname',
    'userEmail',
    'userAuth',
    'userGroup',
    'islemler',
  ];
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatSort) paginator?: MatSort;
  dialogRef?: MatDialogRef<UserDialogComponent>;
  confirmDialog?: MatDialogRef<ConfirmDialogComponent>;
  dataSource: any;
  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public alertService: AlertService
  ) {}

  ngOnInit() {
    this.ListOfUser();
  }

  ListOfUser() {
    this.apiService.ListOfUser().subscribe((p: MainModel[]) => {
      this.users = p;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  Filter(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AddUser() {
    var record: MainModel = new MainModel();
    this.dialogRef = this.matDialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        newRecord: record,
        process: 'add',
      },
    });

    this.dialogRef.afterClosed().subscribe((p: MainModel) => {
      var tempUser: UserModel = new UserModel();
      tempUser.userNameSurname = p.userNameSurname;
      tempUser.userEmail = p.userEmail;
      tempUser.userPassword = p.userPassword;
      tempUser.userAuthorityId = p.userAuthority?.Id;
      tempUser.userGroupId = p.userGroup?.Id;

      this.apiService.AddUser(tempUser).subscribe((s: ResultModel) => {
        this.alertService?.AlertUygula(s);
        if (s.process) {
          this.ListOfUser();
        }
      });
    });
  }

  EditUser(record: UserModel) {
    console.log(record.Id);
    this.dialogRef = this.matDialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        newRecord: record,
        process: 'edit',
      },
    });

    this.dialogRef.afterClosed().subscribe((p: MainModel) => {
      console.log(p);

      var tempUser: UserModel = new UserModel();
      tempUser.Id = p.Id;
      tempUser.userNameSurname = p.userNameSurname;
      tempUser.userEmail = p.userEmail;
      tempUser.userPassword = p.userPassword;
      tempUser.userAuthorityId = p.userAuthority?.Id;
      tempUser.userGroupId = p.userGroup?.Id;

      console.log(tempUser.Id);

      this.apiService.UpdateUser(tempUser).subscribe((s: ResultModel) => {
        this.alertService?.AlertUygula(s);
        if (s.process) {
          this.ListOfUser();
        }
      });
    });
  }

  DeleteUser(record: UserModel) {
    this.confirmDialog = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });

    this.confirmDialog.componentInstance.dialogMesaj =
      record.userNameSurname +
      ' Kullanıcısını Silmek İstediğinizden Emin Misiniz?';

    this.confirmDialog.afterClosed().subscribe((p) => {
      this.apiService
        .DeleteUser(record.Id?.toString() ?? '0')
        .subscribe((s: ResultModel) => {
          this.alertService.AlertUygula(s);
          if (s.process) {
            this.ListOfUser();
          }
        });
    });
  }
}
