import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../user/User';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginUser = new EventEmitter<User>();

  private handle;
  private password;
  private currentUser: User;
  private router: Router;
  private loginError: boolean;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
  }

  ngOnInit() {
  }

  /**
   *   calls the backend and returns a user with the handle and password
   *   if no user exists, login fails
   *   if success, navigate to user's feed
   */
  public async login() {
    if (!this.handle || !this.password) {
      this.loginError = true;
      this.loginUser.emit(null);
      return;
    }
    const user = await this.userService.login(this.handle, this.password);
    console.log('user', user);
    if (!user || user.getHandle() === '') {
      this.loginError = true;
      this.loginUser.emit(null);
      return;
    }
    this.currentUser = user;
    this.userService.setCurrentUser(this.currentUser);
    console.log(this.handle, this.password, this.currentUser.getHandle());
    this.router.navigateByUrl('feed');
    this.loginUser.emit(this.currentUser);
  }

  public cancel() {
    console.log('cancel');
    // deletes input
  }

}
