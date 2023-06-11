import { Observable, map } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupModel } from '../models/group-model';
import { AuthModel } from '../models/auth-model';
import { FileModel } from '../models/file-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: String = 'http://localhost:52324/api/';
  userController = 'user/';
  groupController = 'group/';
  authcontroller = 'authority/';
  fileController = 'file/';

  constructor(public http: HttpClient) {}

  // Token

  GetToken(email: string, password: string) {
    var data =
      'username=' + email + '&password=' + password + '&grant_type=password';
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(this.apiUrl + 'token', data, { headers: reqHeader });
  }

  // User

  ListOfUser(): Observable<UserModel[]> {
    return this.http
      .get<UserModel[]>(this.apiUrl + this.userController + 'list')
      .pipe(map((response) => response as UserModel[]));
  }

  UserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(
      this.apiUrl + this.userController + 'userById/' + id
    );
  }

  DeleteUser(id: string): Observable<any> {
    return this.http.delete(
      this.apiUrl + this.userController + 'deleteUser/' + id
    );
  }

  AddUser(user: UserModel): Observable<any> {
    return this.http.post(this.apiUrl + this.userController + 'addUser', user);
  }

  UpdateUser(user: UserModel): Observable<any> {
    return this.http.put(
      this.apiUrl + this.userController + 'updateUser',
      user
    );
  }

  // End User

  // Group

  ListOfGroups(): Observable<GroupModel[]> {
    return this.http
      .get<GroupModel[]>(this.apiUrl + this.groupController + 'list')
      .pipe(map((response) => response as GroupModel[]));
  }

  GroupById(id: string): Observable<GroupModel> {
    return this.http.get<GroupModel>(
      this.apiUrl + this.groupController + 'groupById/' + id
    );
  }

  DeleteGroup(id: string): Observable<any> {
    return this.http.delete(
      this.apiUrl + this.groupController + 'deleteGroup/' + id
    );
  }

  AddGroup(group: GroupModel): Observable<any> {
    return this.http.post(
      this.apiUrl + this.groupController + 'addGroup',
      group
    );
  }

  UpdateGroup(group: GroupModel): Observable<any> {
    return this.http.put(
      this.apiUrl + this.groupController + 'updateGroup',
      group
    );
  }

  // End Group

  // Authority

  ListOfAuth(): Observable<AuthModel[]> {
    return this.http
      .get<AuthModel[]>(this.apiUrl + this.authcontroller + 'list')
      .pipe(map((response) => response as AuthModel[]));
  }

  AuthById(id: string): Observable<AuthModel> {
    return this.http.get<AuthModel>(
      this.apiUrl + this.authcontroller + 'authorityById/' + id
    );
  }

  DeleteAuth(id: string): Observable<any> {
    return this.http.get(
      this.apiUrl + this.authcontroller + 'deleteAuthority/' + id
    );
  }

  AddAuth(auth: AuthModel): Observable<any> {
    return this.http.post(this.apiUrl + this.authcontroller + 'addAuth', auth);
  }

  UpdateAuth(auth: AuthModel): Observable<any> {
    return this.http.put(
      this.apiUrl + this.authcontroller + 'updateAuthority',
      auth
    );
  }

  // End Authority

  // File

  ListOfFile(): Observable<FileModel[]> {
    return this.http
      .get<FileModel[]>(this.apiUrl + this.fileController + 'list')
      .pipe(map((response) => response as FileModel[]));
  }

  FileById(id: string): Observable<FileModel> {
    return this.http.get<FileModel>(
      this.apiUrl + this.fileController + 'fileById/' + id
    );
  }

  DeleteFile(id: string): Observable<any> {
    return this.http.delete(
      this.apiUrl + this.fileController + 'deleteFile/' + id
    );
  }

  AddFile(file: FileModel): Observable<any> {
    return this.http.post('http://localhost:52324/api/file/addFile', file);
  }

  UpdateFile(group: GroupModel): Observable<any> {
    return this.http.put(
      this.apiUrl + this.fileController + 'updateFile',
      group
    );
  }

  UploadFile(file?: File) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http.post(this.apiUrl + 'file/uploadFile', formData).subscribe(
        (response) => {
          console.log('Dosya yükleme başarılı.');
        },
        (error) => {
          console.error('Dosya yükleme hatası:', error);
        }
      );
    }
  }

  DownloadFile(fileName: string) {
    this.http
      .get(this.apiUrl + 'uploads/' + fileName, { responseType: 'blob' })
      .subscribe(
        (response) => {
          this.saveFile(response);
        },
        (error) => {
          console.error('Dosya indirme hatası:', error);
        }
      );
  }

  private saveFile(blobData: Blob) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blobData);
    downloadLink.download = 'WebAPI-DersNotlari-2022.pdf';
    downloadLink.click();
  }
}
