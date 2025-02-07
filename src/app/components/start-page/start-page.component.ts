import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  imports: [
    NgIf,
    LoginComponent,
    RouterLink
  ],
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  showHeader: boolean = false;

  constructor(private router: Router) {}

  toggleHeader(show: boolean = true) {
    this.showHeader = show;
  }
}
