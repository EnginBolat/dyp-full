import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  localName = localStorage.getItem('userNameSurname');
  token = localStorage.getItem('token');
  uid = localStorage.getItem('uid');
  userEmail = localStorage.getItem('userEmail');
  userAuth: string = localStorage.getItem('userAuth') ?? '';

  someMethod() {
    this.trigger?.openMenu();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  LogOut() {
    localStorage.clear();
    location.href = '/';
  }

  UserEmptyControl() {
    if (
      this.localName &&
      this.token &&
      this.uid &&
      this.userEmail &&
      this.userAuth
    ) {
      return true;
    }
    return false;
  }
}
