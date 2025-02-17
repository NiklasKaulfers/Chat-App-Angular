import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

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
      this.buttonPressed = false;
      return;
    }

    if (this.passwordFirst !== this.passwordSecond){
      this.creationFeedback = "Password must match";
      return;
    }
    let pin = this.passwordFirst;

    const token = localStorage.getItem("token");
    if (!token) {
      this.creationFeedback = "Please log in.";
      return;
    }

    try {
      const response = await fetch("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          pin: pin,
          display_name: this.title
        })
      });

      const data = await response.json();

      if (data.ok) {
        this.creationFeedback = `Created room: ${this.title}`;
      } else {
        this.creationFeedback = "Server error occurred";
      }
    } catch (error) {
      this.creationFeedback = "Network error occurred";
      console.error("Error:", error);
    }

    this.buttonPressed = false;
  };
}
