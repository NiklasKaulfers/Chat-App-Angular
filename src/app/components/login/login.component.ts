import {ApplicationConfig, Component} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logInRequestSent: boolean = false;
  loginState: string = "";

  async sendLogin() {
    const userName = document.getElementById('usernameLogin')?.innerText;
    const password = document.getElementById('passwordLogin')?.innerText;
    if (userName && password) {
      this.logInRequestSent = true;
      let response: Response;
      try {
        response = await fetch("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username: userName, password: password}),
        });
      } catch (err){
        this.loginState = "error on server side";
        return;
      }
      if (!response) {
        this.loginState = "error in application"
        return;
      }
      const parsedResponse = await response.json();
      if (response.ok) {
        if (!parsedResponse) {
          this.loginState = "error parsing server answer"
          return;
        }
        localStorage.setItem('token', parsedResponse.body.token);
        localStorage.setItem('username', userName);
        this.loginState = 'logged in';
      } else {
        this.loginState = "unsuccessful login"
      }
    }
  }
}


