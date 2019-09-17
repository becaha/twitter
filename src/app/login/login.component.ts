import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from './User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginUser = new EventEmitter<User>();

  private handle;
  private password;
  private user: User;
  private router: Router;
  private loginError: boolean;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
  }

  // calls the backend and returns a user with the handle and password
  public login() {
    console.log(this.handle, this.password);
    // creates dummy user with the handle and password
    this.user = new User(this.handle, this.password);
    // if successful take user to his feed
    // for now dummy user is user password
    if (this.user.handle === 'user' && this.password === 'password') {
      this.router.navigateByUrl('/feed');
      this.loginUser.emit(this.user);
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
