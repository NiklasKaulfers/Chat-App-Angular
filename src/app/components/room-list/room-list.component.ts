import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class RoomListComponent implements OnInit {
  constructor(private router: Router) {}
  rooms: any[] = [];
  errorCount: number = 0;

  async ngOnInit(): Promise<void> {
    await this.fetchRooms();
  }

  /** Fetch rooms from the API */
  async fetchRooms(): Promise<void> {

    const response = await fetch("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/rooms", {
      method: "GET"
    });
    if (!response.ok) {
      console.error("FATAL: Unable to get room list.");
      if (this.errorCount < 3){
        await this.fetchRooms();
        this.errorCount ++;
      }
      return;
    }
    const responseItems = await response.json();
    this.rooms = responseItems.rooms;
  }

  async joinRoom(room: any) {
    const token: string | null = localStorage.getItem("token");
    if (!token){
      console.error("ERROR: User not logged in.");
      return;
    }
    let pin = "";
    if (room.has_Pasword){
      const passwordHtmlComponent = document.getElementById(room.id)
      if (!passwordHtmlComponent){
        console.error("ERROR: Component creation error.");
        return;
      }
      pin = passwordHtmlComponent.innerText;
    }
    const response = await fetch("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({pin: pin})
    });
    if (!response.ok) {
      console.error("Error: Unable to get room list.");
      return;
    }
    const responseItem = await response.json();
    localStorage.setItem("room_token", responseItem.roomToken);
    console.log("success");
    await this.router.navigate(['/chat']);
  }
}
