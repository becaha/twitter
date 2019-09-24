import {Component, Input} from '@angular/core';
import {User} from './user/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TwitterLab';
  // TODO: take this default user out
  @Input() currentUser: User; // = new User('a', 'a');

  onLogin(event) {
    this.currentUser = event;
  }

  logout() {
    this.currentUser = null;
  }
}
