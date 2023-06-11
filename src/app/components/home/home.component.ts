import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResultModel } from 'src/app/models/result-model';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public alertService: AlertService,
    // public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>,
    public matDialog: MatDialog
  ) {}

  confirmDialogRef?: MatDialogRef<ConfirmDialogComponent>;

  ngOnInit() {}

  OpenAlert(s: boolean) {
    var r: ResultModel = new ResultModel();
    r.process = s;
    r.message = 'Bu bir test mesajıdır';

    this.alertService.AlertUygula(r);
  }

  OpenConfirm() {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj =
      'Kayıt Silinecek Onaylıyor Musunuz?';
    this.confirmDialogRef.afterClosed().subscribe((d) => {
      try {
        if (d) {
          // Silme İşlemi
        } else {
          // İptal İşlemi
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}
