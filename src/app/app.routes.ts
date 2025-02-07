import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {StartPageComponent} from './components/start-page/start-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'start', component: StartPageComponent },
];
