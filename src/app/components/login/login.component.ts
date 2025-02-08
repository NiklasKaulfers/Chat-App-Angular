import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  logInRequestSent: boolean = false;
  loginState: string = "";
  showPassword: boolean = false; // NEW: Password visibility toggle

  constructor(private router: Router) {}

  // Toggle password visibility
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
      const response = await fetch(
        "https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: this.username, password: this.password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success && data.body?.token) {
        localStorage.setItem("token", data.body.token);
        localStorage.setItem("username", this.username);
        this.loginState = "Login successful!";
      } else {
        this.loginState = "Invalid username or password";
      }
    } catch (error) {
      console.error("Login error:", error);
      this.loginState = "Server error, please try again";
    }
  };
}
