import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HSZG Chat-App';
}
