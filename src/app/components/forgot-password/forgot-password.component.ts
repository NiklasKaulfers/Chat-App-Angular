import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = "";
  requestSent: boolean = false;
  requestState: string = "";

  async sendRequest() {
    const response = await fetch("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/passwordManagement/passwordReset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userMail: this.email}),
    });
    if (response.status === 200){
      this.requestSent = true;
      this.requestState = `Sent email to ${this.email}`
    } else {
      this.requestState = "Error sending your email"
    }
  }
}
