import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = localStorage.getItem("username") || " ";

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    })
  }


  async logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.username = '';
    window.location.reload()
    await this.router.navigate(['/start']);
  }
}
