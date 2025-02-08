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
  buttonPressed = false;
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
    this.buttonPressed = true;

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
        "https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/users",
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

      const data = await response.json();

      if (data.success) {
        this.userInfo = `Signed in and registered as ${this.userName}`;
        sessionStorage.setItem("userName", this.userName);
      } else {
        this.userInfo = "Server error occurred";
      }
    } catch (error) {
      this.userInfo = "Network error occurred";
      console.error("Error:", error);
    }
  };
}
