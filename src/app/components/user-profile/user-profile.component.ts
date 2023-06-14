import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FileModel } from 'src/app/models/file-model';
import { MainModel } from 'src/app/models/main-model';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { FileDialogComponent } from '../dialogs/file-dialog/file-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ResultModel } from 'src/app/models/result-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  id?: number;
  currentUser?: MainModel;
  files?: FileModel[];
  displayedColumns = ['fileName', 'groupName', 'islemler'];
  dataSource: any;
  dialogRef?: MatDialogRef<FileDialogComponent>;
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
    });
    this.GetUserDetails();
    this.GetFiles();
  }

  GetUserDetails() {
    this.apiService
      .UserById(this.id?.toString() ?? '1')
      .subscribe((p: MainModel) => {
        this.currentUser = p;
      });
  }

  GetFiles() {
    this.apiService
      .FileByUserId(this.id?.toString() ?? '1')
      .subscribe((p: FileModel[]) => {
        this.files = p;
        this.dataSource = new MatTableDataSource(this.files);
      });
  }

  Filter(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  EditFile(record: FileModel) {
    this.dialogRef = this.matDialog.open(FileDialogComponent, {
      width: '400px',
      data: {
        newRecord: record,
        process: 'edit',
      },
    });

    this.dialogRef.afterClosed().subscribe((p: FileModel) => {
      if (FileModel != null) {
        var tempFile: FileModel = new FileModel();
        var tempMainModel: MainModel = new MainModel();
        this.apiService
          .UserById(localStorage.getItem('id') ?? '2')
          .subscribe((p) => {
            tempMainModel.Id = p.Id;
            tempMainModel.userNameSurname = p.userNameSurname;
            tempMainModel.userEmail = p.userEmail;
            tempMainModel.userPassword = p.userPassword;
            tempMainModel.userAuthority = p.userAuthority;
            tempMainModel.userGroup = p.userGroup;
          });

        console.log('tempMainModel');
        console.log(tempMainModel);

        if (tempFile && tempFile.fileGroupId !== undefined) {
          tempFile.Id = p.Id;
          tempFile.fileUploaderId = tempMainModel;
          tempFile.fileName = p.fileName;
          tempFile.fileGroupId.Id = p.fileGroupId?.Id;
          tempFile.fileGroupId.groupName = p.fileGroupId?.groupName;
          tempFile.fileUploaderId = p.fileUploaderId;
        }

        console.log('tempFile');
        console.log(tempFile.Id);

        this.apiService.UpdateFile(tempFile).subscribe((s: ResultModel) => {
          this.alertService?.AlertUygula(s);
          if (s.process) {
            this.GetFiles();
          }
        });
      }
    });
  }

  DeleteFile(file: FileModel) {
    this.confirmDialog = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });

    this.confirmDialog.componentInstance.dialogMesaj =
      file.fileName + ' Dosyasını Silmek İstediğinizden Emin Misiniz?';

    this.confirmDialog.afterClosed().subscribe((p) => {
      this.apiService
        .DeleteFile(file.Id?.toString() ?? '0')
        .subscribe((s: ResultModel) => {
          this.alertService.AlertUygula(s);
          if (s.process) {
            this.GetFiles();
          }
        });
    });
  }
  DownloadFile() {}
}
