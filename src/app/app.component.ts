import {Component, Input} from '@angular/core';
import {User} from './user/User';
import {UserService} from './user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TwitterLab';
  // TODO: take this default user out
  // @Input() currentUser: User;
  private userService: UserService;
  private router: Router;
  private signup: boolean;
  private currentUser: User;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
    this.currentUser = this.userService.getCurrentUser();
    console.log(this.currentUser);
  }

  onLogin(event) {
    this.userService.setCurrentUser(event);
    this.userService.setViewUser(event);
    this.currentUser = event;
  }

  logout() {
    this.userService.setCurrentUser(null);
    this.userService.setViewUser(null);
    this.currentUser = null;
    this.signup = false;
  }

  // goToUser() {
  //   console.log(this.currentUser);
  //   this.userService.setViewUser(this.currentUser);
  //   this.router.navigateByUrl('/story');
  // }
}
