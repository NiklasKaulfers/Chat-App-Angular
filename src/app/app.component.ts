import {ApplicationConfig, Component, Injectable} from '@angular/core';
import {provideRouter, RouterLink, RouterOutlet, Routes} from '@angular/router';
import {StartPageComponent} from './components/start-page/start-page.component';
import {HeaderComponent} from './components/header/header.component';
import {NgIf} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartPageComponent, NgIf, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chat-app-ng-frontend';

}

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {
  }
}
