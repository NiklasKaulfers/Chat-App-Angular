import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {StartPageComponent} from './components/start-page/start-page.component';
import {RegisterComponent} from './components/register/register.component';
import {LogoutComponent} from './components/logout/logout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'start', component: StartPageComponent },
  { path: '', redirectTo: "start", pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
];
