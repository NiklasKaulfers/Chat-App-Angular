import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

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
  loggedIn: boolean = this.checkAuthState();

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  checkAuthState(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
