import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { GroupModel } from 'src/app/models/group-model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { ResultModel } from 'src/app/models/result-model';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GroupDialogComponent } from '../dialogs/group-dialog/group-dialog.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  groups?: GroupModel[];
  displayedColumns = ['groupName', 'totalUser', 'islemler'];
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatSort) paginator?: MatSort;
  dialogRef?: MatDialogRef<GroupDialogComponent>;
  dataSource: any;
  confirmDialog?: MatDialogRef<ConfirmDialogComponent>;

  // LocalItem

  localName: string = localStorage.getItem('userNameSurname') ?? '';
  token: string = localStorage.getItem('token') ?? '';
  uid: string = localStorage.getItem('uid') ?? '';
  userEmail: string = localStorage.getItem('userEmail') ?? '';
  userAuth: string = localStorage.getItem('userAuth') ?? '';

  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public alertService: AlertService
  ) {}

  ngOnInit() {
    this.ListOfGroup();
  }

  IsAdmin() {
    this.apiService.IsAdmin();
  }

  ListOfGroup() {
    this.apiService.ListOfGroups().subscribe((p: GroupModel[]) => {
      this.groups = p;
      this.dataSource = new MatTableDataSource(this.groups);
    });
  }

  Filter(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AddGroup() {
    var record: GroupModel = new GroupModel();
    this.dialogRef = this.matDialog.open(GroupDialogComponent, {
      width: '400px',
      data: {
        newRecord: record,
        process: 'add',
      },
    });

    this.dialogRef.afterClosed().subscribe((p: GroupModel) => {
      this.apiService.AddGroup(p).subscribe((s: ResultModel) => {
        this.alertService?.AlertUygula(s);
        if (s.process) {
          this.ListOfGroup();
        }
      });
    });
  }
  EditGroup(record: GroupModel) {
    console.log(record.Id);
    this.dialogRef = this.matDialog.open(GroupDialogComponent, {
      width: '400px',
      data: {
        newRecord: record,
        process: 'edit',
      },
    });

    this.dialogRef.afterClosed().subscribe((p: GroupModel) => {
      this.apiService.UpdateGroup(p).subscribe((s: ResultModel) => {
        this.alertService?.AlertUygula(s);
        if (s.process) {
          this.ListOfGroup();
        }
      });
    });
  }

  DeleteGroup(group: GroupModel) {
    this.confirmDialog = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });

    this.confirmDialog.componentInstance.dialogMesaj =
      group.groupName + ' Grubunu Silmek İstediğinizden Emin Misiniz?';

    this.confirmDialog.afterClosed().subscribe((p) => {
      this.apiService
        .DeleteGroup(group.Id?.toString() ?? '0')
        .subscribe((s: ResultModel) => {
          this.alertService.AlertUygula(s);
          if (s.process) {
            this.ListOfGroup();
          }
        });
    });
  }
}
