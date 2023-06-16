import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FileModel } from 'src/app/models/file-model';
import { GroupModel } from 'src/app/models/group-model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css'],
})
export class FileDialogComponent implements OnInit {
  dialogTitle?: string;
  process?: string;
  frm!: FormGroup;
  newRecord: FileModel = new FileModel();
  groupList: GroupModel[] = [];
  selectedAuth?: string;
  selectedGroup?: string;
  selectedFile?: File;
  selectedFileType?: string;
  selectedFileName?: string;
  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public frmBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.process = data.process;
    this.newRecord = data.newRecord;
    if (this.process == 'add') {
      this.dialogTitle = 'Dosya Ekle';
      this.frm = this.CreateFileForm();
    } else if (this.process == 'edit') {
      this.dialogTitle = 'Dosya Düzenle';
      this.frm = this.EditFileForm();
    }
  }

  ngOnInit() {
    this.GetGroupList();
  }

  AddFile(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const lastDotIndex = this.selectedFile.name.lastIndexOf('.');

      if (lastDotIndex !== -1) {
        this.selectedFileType = this.selectedFile.name.substring(
          lastDotIndex + 1
        );
        this.selectedFileName = this.selectedFile.name.substring(
          0,
          lastDotIndex
        );
      } else {
        this.selectedFileName = this.selectedFileType;
      }

      this.newRecord.fileOriginalName = this.selectedFileName;
      this.newRecord.fileType = this.selectedFileType;

      this.frm.patchValue({ fileOriginalName: this.selectedFileName });
      this.frm.patchValue({ fileType: this.selectedFileType });
      console.log('Add File:' + this.newRecord.fileOriginalName);
      console.log('Add FileType:' + this.newRecord.fileType);

      this.apiService.UploadFile(this.selectedFile);
    }
  }

  GetGroupList() {
    this.apiService.ListOfGroups().subscribe((p: GroupModel[]) => {
      this.groupList = p;
    });
    this.newRecord.fileOriginalName = this.selectedFile?.name;
  }

  handleFileInputChange(event: any): void {
    this.selectedFile = event.target.files[0];
    this.frm.patchValue({ userName: `${event.name}` });
    this.frm.patchValue({ fileOriginalName: this.selectedFileName });
    this.frm.patchValue({ fileType: this.selectedFileType });
  }

  CreateFileForm() {
    return this.frmBuilder.group({
      Id: [this.newRecord.Id],
      fileName: [this.newRecord.fileName],
      fileOriginalName: [this.newRecord.fileOriginalName],
      fileType: [this.selectedFileType ?? this.newRecord.fileType],
      fileGroupId: [this.newRecord.fileGroupId],
      fileUploaderId: [this.newRecord.fileUploaderId],
    });
  }

  EditFileForm() {
    return this.frmBuilder.group({
      Id: [this.newRecord.Id],
      fileName: [this.newRecord.fileName],
      fileOriginalName: [
        this.selectedFileName ?? this.newRecord.fileOriginalName,
      ],
      fileType: [this.selectedFileType ?? this.newRecord.fileType],
      fileGroupId: [this.newRecord.fileGroupId],
      fileUploaderId: [this.newRecord.fileUploaderId],
    });
  }
}
