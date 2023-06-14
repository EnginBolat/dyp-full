import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MainModel } from 'src/app/models/main-model';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { FileDialogComponent } from '../dialogs/file-dialog/file-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { GroupModel } from 'src/app/models/group-model';
import { GroupDialogComponent } from '../dialogs/group-dialog/group-dialog.component';
import { ResultModel } from 'src/app/models/result-model';
import { UserModel } from 'src/app/models/user-model';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-group-user-list',
  templateUrl: './group-user-list.component.html',
  styleUrls: ['./group-user-list.component.css']
})
export class GroupUserListComponent implements OnInit {
  id?: number;
  users?: MainModel[];
  currentGroup?:GroupModel;
  displayedColumns = ['userNameSurname', 'groupName', 'islemler'];
  dataSource: any;
  dialogRef?: MatDialogRef<UserDialogComponent>;
  confirmDialog?: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    private route: ActivatedRoute,
    public apiService: ApiService,
    public alertService: AlertService,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id)
    });
    this.GetGroup();
    this.GetUsers();
  }


  GetUsers() {
    this.apiService
      .UsersByGroupId(this.id?.toString() ?? '1')
      .subscribe((p: MainModel[]) => {
        this.users = p;
        this.dataSource = new MatTableDataSource(this.users);
      });
  }

  GetGroup(){
    this.apiService
    .GroupById(this.id?.toString() ?? '1')
    .subscribe((p: GroupModel) => {
      this.currentGroup = p;
    });
  }

  Filter(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  EditUser(record: MainModel) {
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

      var tempUser: MainModel = new MainModel();
      tempUser.Id = p.Id;
      tempUser.userNameSurname = p.userNameSurname;
      tempUser.userEmail = p.userEmail;
      tempUser.userPassword = p.userPassword;
      tempUser.userAuthority = p.userAuthority;
      tempUser.userGroup = p.userGroup;

      this.apiService.UpdateUser(tempUser).subscribe((s: ResultModel) => {
        this.alertService?.AlertUygula(s);
        if (s.process) {
          this.GetGroup();
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
            this.GetGroup();
          }
        });
    });
  }
}
