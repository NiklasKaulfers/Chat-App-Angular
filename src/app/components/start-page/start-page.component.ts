import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  imports: [
    NgIf,
    RouterLink
  ],
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  showHeader: boolean = false;
  loggedIn: boolean = false;


  logout() {
    localStorage.clear();
    window.location.reload();
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    window.location.reload();
    this.loggedIn = !!token;
  }
}
