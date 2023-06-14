import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { FileModel } from 'src/app/models/file-model';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { ResultModel } from 'src/app/models/result-model';
import { FileDialogComponent } from '../dialogs/file-dialog/file-dialog.component';
import { MainModel } from 'src/app/models/main-model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
})
export class FileComponent implements OnInit {
  files?: FileModel[];
  displayedColumns = ['uploader', 'fileName', 'groupName', 'islemler'];
  @ViewChild(MatSort) matSort?: MatSort;
  @ViewChild(MatPaginator) matPaginator?: MatPaginator;
  dataSource: any;
  dialogRef?: MatDialogRef<FileDialogComponent>;
  confirmDialog?: MatDialogRef<ConfirmDialogComponent>;
  uid: string = localStorage.getItem('uid') ?? '';
  userAuth: string = localStorage.getItem('userAuth') ?? '';
  currentUserGroupId?: string = localStorage.getItem('userGroupId') ?? '';
  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public alertService: AlertService
  ) {}

  ngOnInit() {
    this.ListOfFile();
  }

  IsAdmin() {
    this.apiService.IsAdmin();
  }

  ListOfFile() {
    //   this.apiService.ListOfFileByGroupId(this.currentUserGroupId ?? "1").subscribe((p: FileModel[]) => {
    //     this.files = p;
    //     this.dataSource = new MatTableDataSource(this.files);
    //     this.dataSource.matSort = this.matSort;
    //     this.dataSource.matPaginator = this.matPaginator;
    //   });

    this.apiService.ListOfFile().subscribe((p: FileModel[]) => {
      this.files = p;
      this.dataSource = new MatTableDataSource(this.files);
      this.dataSource.matSort = this.matSort;
      this.dataSource.matPaginator = this.matPaginator;
    });
  }

  Filter(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AddFile() {
    var record: FileModel = new FileModel();
    this.dialogRef = this.matDialog.open(FileDialogComponent, {
      width: '400px',
      data: {
        newRecord: record,
        process: 'add',
      },
    });

    this.dialogRef.afterClosed().subscribe((p: FileModel) => {
      var tempFile: FileModel = new FileModel();
      var tempMainModel: MainModel = new MainModel();
      console.log(p.fileOriginalName);

      this.apiService
        .UserById(localStorage.getItem('uid') ?? '1')
        .subscribe((p) => {
          tempMainModel.Id = parseInt(localStorage.getItem('uid') ?? '1');
          tempMainModel.userNameSurname = p.userNameSurname;
          tempMainModel.userEmail = p.userEmail;
          tempMainModel.userPassword = p.userPassword;
          tempMainModel.userAuthority = p.userAuthority;
          tempMainModel.userGroup = p.userGroup;
        });

      tempFile.fileUploaderId = tempMainModel;
      tempFile.fileName = p.fileName;
      tempFile.fileGroupId = p.fileGroupId;
      tempFile.fileType = p.fileType;
      tempFile.fileOriginalName = p.fileOriginalName;

      var a: number = parseInt(localStorage.getItem('uid') ?? '1');
      tempFile.fileUploaderId.Id = a ?? null;

      console.log(tempFile.fileOriginalName);
      console.log(tempFile.fileType);

      this.apiService.AddFile(tempFile).subscribe((s: ResultModel) => {
        this.alertService?.AlertUygula(s);
        if (s.process) {
          this.ListOfFile();
        }
      });
    });
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
          tempFile.fileOriginalName = p.fileOriginalName;
          tempFile.fileUploaderId = p.fileUploaderId;
          tempFile.fileType = p.fileType;
        }

        console.log('tempFile');
        console.log(tempFile.Id);

        this.apiService.UpdateFile(tempFile).subscribe((s: ResultModel) => {
          this.alertService?.AlertUygula(s);
          if (s.process) {
            this.ListOfFile();
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
            this.ListOfFile();
          }
        });
    });
  }

  DownloadFile(fileName: string, fileType: string) {
    console.log("Name: "+fileName);
    console.log("Type: "+fileType);
    console.log("File: "+fileName+"."+fileType);
    console.log(fileType);
    this.apiService.downloadFile(fileName, fileType);
  }
}
