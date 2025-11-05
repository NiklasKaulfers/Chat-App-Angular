import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-account-manager',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  templateUrl: './account-manager.component.html',
  styleUrl: './account-manager.component.css'
})
export class AccountManagerComponent implements OnInit{
  user: UserDisplay = { email: '', username: '' }; // Replace with real data from your service
  newPassword: string = '';
  showPassword: boolean = false;
  errorDisplay: string = "";
  errorExists: boolean = false;
  passwordChangeRequestSent: boolean = false;
  passwordChangeAnswer: string = "";

  constructor(private router: Router) {
  }


  async ngOnInit() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("username");
    if (!token || !userId){
      this.router.navigate(["/login"]);
      return;
    }

    const response: Response = await fetch("https://chat-app-backend-xi-five.vercel.app/api/users/" + userId , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (response.status === 200){
      const responseItems = await response.json();
      this.user = {
        email: responseItems.email,
        username: responseItems.id
      }
    } else {
      this.errorExists = true;
      this.errorDisplay = "Cannot get user information"
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async changePassword() {
    if (this.newPassword.length < 4) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    const token = localStorage.getItem("token");
    if (!token){
      this.router.navigate(["/login"]);
      return;
    }
    const response: Response = await fetch("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/passwordManagement/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        newPassword: this.newPassword
      })
    });

    if (response.status === 200){
      this.passwordChangeAnswer = "Password changed."
    } else {
      this.passwordChangeAnswer = "Password failed to change."
    }
    this.passwordChangeRequestSent = true;
    this.newPassword = ""
  }
}

interface UserDisplay{
  email: string;
  username: string
}
