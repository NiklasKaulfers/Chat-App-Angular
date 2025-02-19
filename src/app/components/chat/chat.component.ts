import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {io, Socket} from 'socket.io-client';

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
  user: string | null = localStorage.getItem('user');
  roomToken: string | null = localStorage.getItem('roomToken');
  room: string | null = localStorage.getItem('room');
  socket = io("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com");

  sendMessage = () => {
    if (!this.user){
      this.displayMessage("Server", "Please log in.");
      return;
    }
    if (!this.roomToken){
      this.displayMessage("Server", "Please log into the room.");
      return;
    }
    this.socket.emit('message', JSON.stringify({
      token: this.roomToken,
      message: this.userInput,
      user: this.user
    }))
  }
  displayMessage(sender: string, message: string) {
    this.messages.push({ sender, message });
  }

  ngOnInit(): void {
  }
}


