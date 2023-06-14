import { Observable, map } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupModel } from '../models/group-model';
import { AuthModel } from '../models/auth-model';
import { FileModel } from '../models/file-model';
import { MainModel } from '../models/main-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: String = 'http://localhost:52324/api/';
  userController = 'user/';
  groupController = 'group/';
  authcontroller = 'authority/';
  fileController = 'file/';
  token?: string;

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

  CheckToken() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  IsAdmin() {
    var userAuth = localStorage.getItem('userAuth');
    if (userAuth == 'Admin') {
      return true;
    }
    return false;
  }

  // User

  ListOfUser(): Observable<UserModel[]> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<UserModel[]>(this.apiUrl + this.userController + 'list', { headers })
      .pipe(map((response) => response as UserModel[]));
  }

  UserById(id: string): Observable<MainModel> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<MainModel>(
      this.apiUrl + this.userController + 'userById/' + id,
      { headers }
    );
  }

  UsersByGroupId(id: string): Observable<MainModel[]> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<MainModel[]>(
      this.apiUrl + this.userController + 'usersByGroupId/' + id,
      { headers }
    );
  }

  DeleteUser(id: string): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(
      this.apiUrl + this.userController + 'deleteUser/' + id,
      { headers }
    );
  }

  AddUser(user: MainModel): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(this.apiUrl + this.userController + 'addUser', user, {
      headers,
    });
  }

  UpdateUser(user: MainModel): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(
      this.apiUrl + this.userController + 'updateUser',
      user,
      { headers }
    );
  }

  // End User

  // Group

  ListOfGroups(): Observable<GroupModel[]> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<GroupModel[]>(this.apiUrl + this.groupController + 'list', {
        headers,
      })
      .pipe(map((response) => response as GroupModel[]));
  }

  GroupById(id: string): Observable<GroupModel> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<GroupModel>(
      this.apiUrl + this.groupController + 'groupById/' + id,
      { headers }
    );
  }

  DeleteGroup(id: string): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(
      this.apiUrl + this.groupController + 'deleteGroup/' + id,
      { headers }
    );
  }

  AddGroup(group: GroupModel): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(
      this.apiUrl + this.groupController + 'addGroup',
      group,
      { headers }
    );
  }

  UpdateGroup(group: GroupModel): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(
      this.apiUrl + this.groupController + 'updateGroup',
      group,
      { headers }
    );
  }

  // End Group

  // Authority

  ListOfAuth(): Observable<AuthModel[]> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<AuthModel[]>(this.apiUrl + this.authcontroller + 'list', { headers })
      .pipe(map((response) => response as AuthModel[]));
  }

  AuthById(id: string): Observable<AuthModel> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<AuthModel>(
      this.apiUrl + this.authcontroller + 'authorityById/' + id,
      { headers }
    );
  }

  DeleteAuth(id: string): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(
      this.apiUrl + this.authcontroller + 'deleteAuthority/' + id,
      { headers }
    );
  }

  AddAuth(auth: AuthModel): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(this.apiUrl + this.authcontroller + 'addAuth', auth, {
      headers,
    });
  }

  UpdateAuth(auth: AuthModel): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(
      this.apiUrl + this.authcontroller + 'updateAuthority',
      auth,
      { headers }
    );
  }

  // End Authority

  // File

  ListOfFile(): Observable<FileModel[]> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<FileModel[]>(this.apiUrl + this.fileController + 'list', { headers })
      .pipe(map((response) => response as FileModel[]));
  }

  ListOfFileByGroupId(id: string): Observable<FileModel[]> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<FileModel[]>(
        this.apiUrl + this.fileController + 'listByGroupId/' + id,
        { headers }
      )
      .pipe(map((response) => response as FileModel[]));
  }

  FileById(id: string): Observable<FileModel> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<FileModel>(
      this.apiUrl + this.fileController + 'fileById/' + id,
      { headers }
    );
  }

  FileByUserId(id: string): Observable<FileModel[]> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<FileModel[]>(
      this.apiUrl + this.fileController + 'filesByUserId/' + id,
      { headers }
    );
  }

  DeleteFile(id: string): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(
      this.apiUrl + this.fileController + 'deleteFile/' + id,
      { headers }
    );
  }

  AddFile(file: FileModel): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post('http://localhost:52324/api/file/addFile', file, {
      headers,
    });
  }

  UpdateFile(group: GroupModel): Observable<any> {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(
      this.apiUrl + this.fileController + 'updateFile',
      group,
      { headers }
    );
  }

  UploadFile(file?: File) {
    this.token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post(this.apiUrl + 'file/uploadFile', formData, { headers })
        .subscribe(
          (response) => {
            console.log('Dosya yükleme başarılı.');
          },
          (error) => {
            console.error('Dosya yükleme hatası:', error);
          }
        );
    }
  }

  downloadFile(fileName:string,fileType:string): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Accept': 'application/octet-stream'
    });
    var fullFile = fileName+"."+fileType;
    this.http.get(this.apiUrl+`file/downloadFile/${fileName}/${fileType}`, { headers: headers, responseType: 'blob' })
      .subscribe((data: Blob) => {
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fullFile;
        link.click();
      });
  }
}
