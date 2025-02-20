import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {
  }

  userInput: string = '';
  messages: { sender: string; message: string }[] = [];
  channel: any;
  user: string | null = localStorage.getItem('username');
  roomToken: string | null = localStorage.getItem('roomToken');
  room: string | null = localStorage.getItem('room');

  socket: Socket | null  = io("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com", {
    transports: ["websocket", "polling"],
  });

  sendMessage = () => {
    if (!this.userInput.trim()) {
      return;
    }

    if (!this.socket) {
      this.displayMessage("Server", "Not connected to chat server");
      return;
    }

    this.socket.emit('message', {
      message: this.userInput
    });

    this.userInput = '';
  }
  displayMessage(sender: string, message: string) {
    this.messages.push({ sender, message });
  }

  ngOnInit(): void {
    if (!this.roomToken) {
      this.displayMessage("Server", "Please join a room first.");
      return;
    }

    // Initialize the socket with auth token
    this.socket = io("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com", {
      transports: ["websocket", "polling"],
      auth: {
        token: this.roomToken
      }
    });

    // Set up event listeners
    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      this.displayMessage("Server", "Connected to chat room");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
      this.displayMessage("Server", `Connection error: ${error.message}`);
    });

    // Update the message handling to match the new format
    this.socket.on("message", (data: { id: string, user: string, message: string, timestamp: string }) => {
      this.displayMessage(data.user, data.message);
    });

    // Add handling for user joined/left events
    this.socket.on("userJoined", (data: { user: string, activeUsers: string[] }) => {
      this.displayMessage("Server", `${data.user} joined the room`);
      console.log("Active users:", data.activeUsers);
    });

    this.socket.on("userLeft", (data: { user: string, activeUsers: string[] }) => {
      this.displayMessage("Server", `${data.user} left the room`);
      console.log("Active users:", data.activeUsers);
    });

    this.socket.on("userTyping", (data: { user: string, isTyping: boolean }) => {
      console.log(`${data.user} is ${data.isTyping ? 'typing...' : 'stopped typing'}`);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      this.displayMessage("Server", "Disconnected from chat room");
    });
  }
  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}


