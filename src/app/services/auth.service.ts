import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Default is logged out
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor() {
    const token = localStorage.getItem('token');
    this.loggedIn.next(!!token);
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
  }
}
