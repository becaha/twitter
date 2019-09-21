import {Component, Input} from '@angular/core';
import {User} from './login/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TwitterLab';
  // TODO: take this default user out
  @Input() user: User = new User('a', 'a');

  onLogin(event) {
    this.user = event;
  }

  logout() {
    this.user = null;
  }
}
