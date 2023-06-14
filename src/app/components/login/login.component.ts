import { Component, OnInit } from '@angular/core';
import { ResultModel } from 'src/app/models/result-model';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public apiService: ApiService,
    public alertService: AlertService
  ) {}

  ngOnInit() {}

  Login(email: string, password: string) {
    this.apiService.GetToken(email, password).subscribe(
      (d: any) => {
        console.log(d);
        
        localStorage.setItem('token', d.access_token);
        localStorage.setItem('uid', d.Id);
        localStorage.setItem('userNameSurname', d.userNameSurname);
        localStorage.setItem('userEmail', d.userEmail);
        localStorage.setItem('userAuth', d.userAuthorityName);
        localStorage.setItem('userGroupId', d.userGroupId); 

        location.href = '/files';

      },
      (err) => {
        var response: ResultModel = new ResultModel();
        response.process = false;
        response.message = 'Kullanıcı Adı veya Şifre Hatalı...';

        this.alertService.AlertUygula(response);
      }
    );
  }
}
