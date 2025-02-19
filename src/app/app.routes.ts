import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {StartPageComponent} from './components/start-page/start-page.component';
import {RegisterComponent} from './components/register/register.component';
import {RoomListComponent} from './components/room-list/room-list.component';
import {ChatComponent} from './components/chat/chat.component';
import {CreateRoomComponent} from './components/create-room/create-room.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'joinRoom', component: RoomListComponent },
  { path: 'rooms', redirectTo: '/joinRoom', pathMatch: 'full' },
  { path: 'createRoom', component: CreateRoomComponent },
  { path: 'start', component: StartPageComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: "start", pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent}
];
