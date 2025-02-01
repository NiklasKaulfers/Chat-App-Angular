import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StartPageComponent} from './components/start-page/start-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chat-app-ng-frontend';

  loggedIn:boolean = false;

}
