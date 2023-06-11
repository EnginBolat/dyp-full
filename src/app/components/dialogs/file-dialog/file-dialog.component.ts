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

    this.apiService.UploadFile(this.selectedFile);
  }

  GetGroupList() {
    this.apiService.ListOfGroups().subscribe((p: GroupModel[]) => {
      this.groupList = p;
    });
  }

  handleFileInputChange(event: any): void {
    this.frm.patchValue({ userName: `${event.name}` });
    console.log(event.target.files[0]);
  }

  CreateFileForm() {
    return this.frmBuilder.group({
      Id: [this.newRecord.Id],
      fileName: [this.newRecord.fileName],
      fileGroupId: [this.newRecord.fileGroupId],
      fileTypeId: [this.newRecord.fileTypeId],
      fileUploaderId: [this.newRecord.fileUploaderId],
    });
  }

  EditFileForm() {
    return this.frmBuilder.group({
      Id: [this.newRecord.Id],
      fileName: [this.selectedFile?.name],
      fileGroupId: [this.newRecord.fileGroupId],
      fileTypeId: [this.newRecord.fileTypeId],
      fileUploaderId: [this.newRecord.fileUploaderId],
    });
  }
}
