import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {StartPageComponent} from './components/start-page/start-page.component';
import {HeaderComponent} from './components/header/header.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartPageComponent, NgIf, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chat-app-ng-frontend';
}
