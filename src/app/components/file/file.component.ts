import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { FileModel } from 'src/app/models/file-model';
import { ApiService } from 'src/app/services/api.service';
import { GroupDialogComponent } from '../dialogs/group-dialog/group-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { ResultModel } from 'src/app/models/result-model';
import { FileDialogComponent } from '../dialogs/file-dialog/file-dialog.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
})
export class FileComponent implements OnInit {
  files?: FileModel[];
  displayedColumns = ['uploader', 'fileName', 'groupName', 'islemler'];
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatSort) paginator?: MatSort;
  dialogRef?: MatDialogRef<FileDialogComponent>;
  dataSource: any;
  confirmDialog?: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public alertService: AlertService
  ) {}

  ngOnInit() {
    this.ListOfFile();
  }

  ListOfFile() {
    this.apiService.ListOfFile().subscribe((p: FileModel[]) => {
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
      tempFile.fileName = p.fileName;
      tempFile.fileGroupId = p.fileGroupId;
      tempFile.fileTypeId = p.fileTypeId ?? 1;
      tempFile.fileUploaderId = p.fileUploaderId;
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
      this.apiService.UpdateFile(p).subscribe((s: ResultModel) => {
        this.alertService?.AlertUygula(s);
        if (s.process) {
          this.ListOfFile();
        }
      });
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
}
