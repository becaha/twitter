import { Component, OnInit } from '@angular/core';
import {User} from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private handle;
  private password;
  private user: User;

  constructor() { }

  ngOnInit() {
  }

  // calls the backend and returns a user with the handle and password
  public login() {
    console.log(this.handle, this.password);
    // let userLoggedIn = login(this.handle, this.password);
    // this.user = userLoggedIn;
  }

  public cancel() {
    console.log('cancel');
    // deletes input
  }

}
