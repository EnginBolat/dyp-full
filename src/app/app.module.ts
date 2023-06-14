import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { AlertService } from './services/alert.service';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UserComponent } from './components/user/user.component';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './components/group/group.component';
import { GroupDialogComponent } from './components/dialogs/group-dialog/group-dialog.component';
import { FileComponent } from './components/file/file.component';
import { FileDialogComponent } from './components/dialogs/file-dialog/file-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { GroupUserListComponent } from './components/group-user-list/group-user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    GroupComponent,
    MainNavComponent,
    FileComponent,
    LoginComponent,
    UserProfileComponent,
    GroupUserListComponent,

    // Dialogs
    AlertDialogComponent,
    ConfirmDialogComponent,
    UserDialogComponent,
    GroupDialogComponent,
    FileDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AlertDialogComponent,
    UserDialogComponent,
    GroupDialogComponent,
    FileDialogComponent,
  ],
  providers: [
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
