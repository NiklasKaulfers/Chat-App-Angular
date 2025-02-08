import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'https://web-ing-iib23-chat-app-backend-377dbfe5320c.herokuapp.com/api/rooms';

  constructor(private http: HttpClient) {}

  fetchRooms(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  joinRoomWithoutPin(roomId: number): Observable<any> {
    const token = sessionStorage.getItem('jwt_token');
    if (!token) {
      console.error('Error getting the token.');
      return new Observable(); // Return an empty observable if there's no token
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.apiUrl}/${roomId}`, { pin: '' }, { headers });
  }

  joinRoomWithPin(roomId: number, pin: string): Observable<any> {
    const token = sessionStorage.getItem('jwt_token');
    if (!token) {
      console.error('Error getting the token.');
      return new Observable();
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.apiUrl}/${roomId}`, { pin }, { headers });
  }
}
