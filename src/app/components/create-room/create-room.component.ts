import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-create-room',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  creationFeedback: string = "";
  buttonPressed = false;
  title: string = "";
  passwordFirst: string = "";
  passwordSecond: string = "";
  showPassword: boolean = false;

  togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  };

  createRoom = async (): Promise<void> => {
    this.buttonPressed = true;

    if (!this.title) {
      this.creationFeedback = "Needs a title";
      return;
    }

    let pin = "";
    if ((this.passwordFirst || this.passwordSecond) && this.passwordFirst === this.passwordSecond) {
      pin = this.passwordFirst;
    } else {
      this.creationFeedback = "Passwords don't match";
      return;
    }

    try {
      const response = await fetch(
        "https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/rooms",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pin: pin,
            display_name: `${this.title}`,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        this.creationFeedback = `created room: ${this.title}`;
      } else {
        this.creationFeedback = "Server error occurred";
      }
    } catch (error) {
      this.creationFeedback = "Network error occurred";
      console.error("Error:", error);
    }
  };
}
