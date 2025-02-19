import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {io, Socket} from 'socket.io-client';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(private router: Router) {
  }

  userInput: string = '';
  messages: { sender: string; message: string }[] = [];
  channel: any;
  user: string | null = localStorage.getItem('username');
  roomToken: string | null = localStorage.getItem('roomToken');
  room: string | null = localStorage.getItem('room');

   socket = io("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com", {
     transports: ["websocket", "polling"],
   });

  sendMessage = () => {
    if (!this.user){
      this.displayMessage("Server", "Please log in.");
      return;
    }
    if (!this.roomToken){
      this.displayMessage("Server", "Please log into the room.");
      return;
    }
    this.socket.emit('message', ({
      token: this.roomToken,
      message: this.userInput,
      user: this.user
    }))
  }
  displayMessage(sender: string, message: string) {
    this.messages.push({ sender, message });
  }

  ngOnInit(): void {
    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    this.socket.on("message", (data: string) => {
      try {
        const parsedData = JSON.parse(data);
        this.displayMessage(parsedData.user, parsedData.message);
      } catch (e) {
        console.error("Error parsing message data", e);
      }
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
  }

}


