import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ResultModel } from '../models/result-model';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertDialogRef?: MatDialogRef<AlertDialogComponent>;
  constructor(public materialDialog: MatDialog) {}

  AlertUygula(result: ResultModel) {
    var baslik;
    if (result.process == true) {
      baslik = 'İşlem Tamamlandı';
    } else {
      baslik = 'Bir Hata Oluştu';
    }

    this.alertDialogRef = this.materialDialog.open(AlertDialogComponent, {
      width: '300px',
    });
    
    this.alertDialogRef.componentInstance.dialogBaslik = baslik;
    this.alertDialogRef.componentInstance.dialogIslem = result.process;
    this.alertDialogRef.componentInstance.dialogMesaj = result.message;

    this.alertDialogRef.afterClosed().subscribe(d=>{
      this.alertDialogRef;
    });
  }
}
