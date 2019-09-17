import {Component, Input} from '@angular/core';
import {User} from './login/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TwitterLab';
  @Input() user: User;

  onLogin(event) {
    this.user = event;
  }

  logout() {
    this.user = null;
  }
}
