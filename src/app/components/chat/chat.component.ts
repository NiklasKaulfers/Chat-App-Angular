import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  userInput: string = '';

  submitText() {
    console.log('User Input:', this.userInput);
    alert('Submitted: ' + this.userInput);
  }

}
