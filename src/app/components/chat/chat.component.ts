import {Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf, DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {io, Socket} from 'socket.io-client';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, DatePipe],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatBox') chatBox!: ElementRef;

  constructor(private router: Router) {
  }

  userInput: string = '';
  messages: { sender: string; message: string; timestamp?: string }[] = [];
  someoneTyping = false;
  user: string | null = localStorage.getItem('username');
  roomToken: string | null = localStorage.getItem('roomToken');
  room: string | null = localStorage.getItem('room');
  socket: Socket | null = null;

  sendMessage() {
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

  displayMessage(sender: string, message: string, timestamp?: string) {
    this.messages.push({ sender, message, timestamp });
  }

  onTyping(isTyping: boolean) {
    if (this.socket) {
      this.socket.emit('typing', isTyping);
    }
  }

  scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch(err) {
      // silent handling
    }
  }

  ngOnInit(): void {
    if (!this.roomToken) {
      this.displayMessage("Server", "Please join a room first.");
      return;
    }

    this.socket = io("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com", {
      transports: ["websocket", "polling"],
      auth: {
        token: this.roomToken
      }
    });

    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      this.displayMessage("Server", "Connected to chat room");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
      this.displayMessage("Server", `Connection error: ${error.message}`);
    });

    this.socket.on("message", (data: { id: string, user: string, message: string, timestamp: string }) => {
      this.displayMessage(data.user, data.message, data.timestamp);
    });

    this.socket.on("userJoined", (data: { user: string, activeUsers: string[] }) => {
      this.displayMessage("Server", `${data.user} joined the room`);
      console.log("Active users:", data.activeUsers);
    });

    this.socket.on("userLeft", (data: { user: string, activeUsers: string[] }) => {
      this.displayMessage("Server", `${data.user} left the room`);
      console.log("Active users:", data.activeUsers);
    });

    this.socket.on("userTyping", (data: { user: string, isTyping: boolean }) => {
      if (data.user !== this.user) {
        this.someoneTyping = data.isTyping;
      }
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      this.displayMessage("Server", "Disconnected from chat room");
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
