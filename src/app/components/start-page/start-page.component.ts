import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

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
export class StartPageComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  private authCheckInterval: any; // Interval reference

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  checkAuthState() {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    if (this.loggedIn !== isLoggedIn) {
      this.loggedIn = isLoggedIn;
      window.location.reload();
    }
  }

  ngOnInit(): void {
    this.checkAuthState();

    // Check for changes every 2 seconds
    this.authCheckInterval = setInterval(() => {
      this.checkAuthState();
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.authCheckInterval) {
      clearInterval(this.authCheckInterval);
    }
  }
}
