import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { GroupComponent } from './components/group/group.component';
import { FileComponent } from './components/file/file.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { GroupUserListComponent } from './components/group-user-list/group-user-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  // },
  {
    path: '',
    // path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'groups',
    component: GroupComponent,
  },
  {
    path: 'files',
    component: FileComponent,
  },
  {
    path: 'userProfile/:id',
    component: UserProfileComponent,
  },
  {
    path: 'groupUserList/:id',
    component: GroupUserListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
