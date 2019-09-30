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

  // calls the backend and returns a user with the handle and password
  public login() {
    // creates dummy user with the handle and password
    this.currentUser = this.userService.getCurrentUser();
    this.userService.setViewUser(this.currentUser);
    // if successful take user to his feed
    // for now dummy user is a a
    if (this.currentUser.handle === 'a' && this.password === 'a') {
      this.router.navigateByUrl('feed');
      this.loginUser.emit(this.currentUser);
    } else {
      this.loginError = true;
      this.loginUser.emit(null);
    }
  }

  public cancel() {
    console.log('cancel');
    // deletes input
  }

}
