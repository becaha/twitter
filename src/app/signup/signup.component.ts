import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../user/User';
import {Attachment} from '../status/attachment/Attachment';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {MOCK_USERS} from '../user/mock-users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() loginUser = new EventEmitter<User>();

  private handle: string;
  private password: string;
  private name: string;
  private attachmentSrc: string;
  private userService: UserService;
  private signupError: boolean;
  private router: Router;
  private currentUser: User;

  constructor(router: Router, userService: UserService) {
    this.userService = userService;
    this.router = router;
    this.signupError = false;
  }

  ngOnInit() {
  }

  /**
   * signs the user up by creating a new user
   * logs the user in by setting the current and view users
   * to the new user
   * if not all the inputs are given, sign up error
   */
  async signup() {
    // TODO: real attachment
    this.attachmentSrc = 'redHat.jpg';
    // TODO: add this.attachment
    if (this.handle && this.password && this.name && this.attachmentSrc) {
      this.currentUser = await this.userService.signup(this.handle, this.password, this.name, this.attachmentSrc);
      this.userService.setCurrentUser(this.currentUser);
      this.userService.setViewUser(this.currentUser);
      this.router.navigateByUrl('feed');
      this.loginUser.emit(this.currentUser);
    } else {
      this.signupError = true;
      this.loginUser.emit(null);
    }
  }

}
