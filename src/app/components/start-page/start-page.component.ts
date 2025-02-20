import {Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-start-page',
  standalone: true,
  templateUrl: './start-page.component.html',
  imports: [
    NgIf,
    RouterLink
  ],
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent{
  constructor(private authService: AuthService) {
  }
  loggedIn: boolean = this.checkAuthState();

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  checkAuthState(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
