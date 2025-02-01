import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-start-page',
  imports: [
    NgIf
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {
  loggedIn: boolean = !!localStorage.getItem("userToken");
}
