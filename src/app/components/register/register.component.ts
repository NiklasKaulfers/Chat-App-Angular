import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    NgClass,
    FormsModule
  ]
})
export class RegisterComponent {
  userInfo: string = "";
  userName: string = "";
  email: string = "";
  passwordFirst: string = "";
  passwordSecond: string = "";
  showPassword: boolean = false;

  togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  };

  createUser = async (): Promise<void> => {

    if (!this.userName) {
      this.userInfo = "Your username is required";
      return;
    }

    if (!this.email) {
      this.userInfo = "Your email is required";
      return;
    }

    if (!this.passwordFirst || !this.passwordSecond) {
      this.userInfo = "Your password is required";
      return;
    }

    if (this.passwordFirst !== this.passwordSecond) {
      this.userInfo = "Your passwords don't match";
      return;
    }

    try {
      const response = await fetch(
        "https://chat-app-backend-xi-five.vercel.app/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: this.userName,
            password: this.passwordFirst,
            email: this.email,
          }),
        }
      );

      if (response.status === 200 || response.status === 201) {
        this.userInfo = `registered as ${this.userName}`;
      } else {
        this.userInfo = "Server error occurred";
      }
    } catch (error) {
      this.userInfo = "Network error occurred";
      console.error("Error:", error);
    }
  };
}
