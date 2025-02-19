import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-room',
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './delete-room.component.html',
  styleUrl: './delete-room.component.css'
})
export class DeleteRoomComponent implements OnInit{
  rooms: Room[] = [];
  errorCount: number = 0;
  user:  string = localStorage.getItem("username") ?? "";

  constructor(private router: Router) {
  }
  async fetchRooms(): Promise<void> {
    const token = localStorage.getItem("token");
    if (!token){
      await this.router.navigate(["/login"])
    }
    const response = await fetch("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/rooms/ownedByUser", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
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


  async deleteRoom(room: Room) {

    const token: string | null = localStorage.getItem("token");
    if (!token){
      console.error("ERROR: User not logged in.");
      return;
    }
    const response = await fetch("https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/rooms/" + room.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (response.status === 200){

    }
  }

  async ngOnInit(): Promise<void> {
    this.fetchRooms();
  }
}
interface Room {
  id: string;
  display_name: string;
  creator: string;
  has_password: boolean
}
