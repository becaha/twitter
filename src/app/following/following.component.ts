import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  private userService: UserService;
  private currentUser: User;
  private viewUser: User;
  private following: User[];

  constructor(userService: UserService) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.viewUser = userService.getViewUser();
    this.following = this.viewUser.getFollowing();
    console.log(this.following);
  }

  ngOnInit() {
  }

}
