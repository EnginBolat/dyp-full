import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public apiService: ApiService) {}

  ngOnInit() {}

  Login(email: string, password: string) {
    this.apiService.GetToken(email, password).subscribe((d) => {
      console.log(d);
    });
  }
}
