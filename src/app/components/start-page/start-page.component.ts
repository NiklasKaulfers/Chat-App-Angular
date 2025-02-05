import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  showHeader: boolean = false;

  constructor(private router: Router) {}

  toggleHeader(show: boolean = true) {
    this.showHeader = show;
    if (show) {
      this.router.navigate(['/login']); // Navigate to login when clicked
    }
  }
}
