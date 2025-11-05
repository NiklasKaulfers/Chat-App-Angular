import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{
  username: string = "";
  password: string = "";
  logInRequestSent: boolean = false;
  loginState: string = "";
  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  };

  sendLogin = async () => {
    if (!this.username || !this.password) {
      this.loginState = "Username and password are required";
      return;
    }

    this.logInRequestSent = true;

    try {
      const response = await fetch("https://chat-app-backend-xi-five.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: this.username, password: this.password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.authService.login(data.accessToken, this.username);
        localStorage.setItem("username", this.username);
        localStorage.setItem("refreshToken", data.refreshToken);
        this.loginState = "Login successful!";
        await this.router.navigate(['/start']);
      } else {
        this.loginState = "Invalid username or password";
      }
    } catch (error) {
      console.error("Login error:", error);
      this.loginState = "Server error, please try again";
    }
  };



}
