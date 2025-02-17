import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userInput: string = '';
  messages: { sender: string; message: string }[] = [];
  channel: any;

  ngOnInit(): void {
    this.initializeChat();
  }

  async initializeChat() {
    try {
      Amplify.configure({
        "API": {
          "Events": {
            endpoint: "https://jleaiewm4jdsrd2wm2coiwuwnu.appsync-api.eu-central-1.amazonaws.com/event",
            region: "eu-central-1",
            defaultAuthMode: "lambda"
          }
        }
      });

      const room = localStorage.getItem("room") || "default-room";
      this.channel = await events.connect(`/default/${room}`);

      this.channel.subscribe({
        error: (error: any) => console.error("Error receiving data:", error),
        next: (data: any) => {
          console.log("Received data:", data);
          this.displayMessage(data.sender, data.message);
        }
      });
    } catch (error) {
      console.error("Chat connection failed:", error);
    }
  }

  async submitText() {
    if (!this.userInput.trim()) return;

    const messageData = {
      sender: "User", // Replace with actual username logic
      message: this.userInput
    };

    this.messages.push(messageData);
    this.userInput = '';

    try {
      await this.channel.publish(messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  displayMessage(sender: string, message: string) {
    this.messages.push({ sender, message });
  }
}
