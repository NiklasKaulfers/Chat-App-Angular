import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: any[] = [];

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  /** Fetch rooms from the API */
  fetchRooms(): void {
    this.roomService.fetchRooms().subscribe(
      (data) => {
        this.rooms = data.rooms || [];
      },
      (error) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  /** Handle joining a room */
  joinRoom(room: any): void {
    if (room.has_password === 'True') {
      this.promptForPin(room.id);
    } else {
      this.roomService.joinRoomWithoutPin(room.id).subscribe(
        (response) => {
          sessionStorage.setItem('room_token', response.roomToken);
          sessionStorage.setItem('room', room.id);
          this.router.navigate(['/in-room']);
        },
        (error) => {
          console.error('Error joining room:', error);
        }
      );
    }
  }

  /** Prompt user for PIN */
  promptForPin(roomId: number): void {
    const pin = prompt('Enter Room PIN:');
    if (pin) {
      this.roomService.joinRoomWithPin(roomId, pin).subscribe(
        (response) => {
          sessionStorage.setItem('room_token', response.roomToken);
          sessionStorage.setItem('room', roomId.toString());
          this.router.navigate(['/in-room']);
        },
        (error) => {
          console.error('Error joining room:', error);
        }
      );
    }
  }
}
