import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../user/User';
import {Attachment} from '../status/Attachment/Attachment';
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
  private attachment: Attachment;
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

  signup() {
    // TODO: real attachment
    this.attachment = new Attachment('redHat.jpg');
    this.currentUser = this.userService.createUser(this.handle, this.password, this.name, [], [], this.attachment);
    this.userService.setCurrentUser(this.currentUser);
    this.userService.setViewUser(this.currentUser);
    // TODO: add this.attachment
    if (this.handle && this.password && this.name) {
      this.router.navigateByUrl('feed');
      this.loginUser.emit(this.currentUser);
    } else {
      this.signupError = true;
      this.loginUser.emit(null);
    }
  }

}