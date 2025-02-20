import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  requestSent: boolean = false;
  requestState: string = '';
  isLoading: boolean = false;

  async sendRequest() {
    if (!this.isEmailValid()) {
      this.requestState = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;
    this.requestSent = false;
    this.requestState = '';

    try {
      const response = await fetch(
        'https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/passwordManagement/passwordReset',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userMail: this.email }),
        }
      );

      if (response.status === 200) {
        this.requestSent = true;
        this.requestState = `Sent email to ${this.email}`;
      } else {
        this.requestState = 'Error sending your email';
      }
    } catch (error) {
      this.requestState = 'An error occurred while sending your request';
    } finally {
      this.isLoading = false;
    }
  }

  private isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.email);
  }
}
