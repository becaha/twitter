import { Component, OnInit } from '@angular/core';
import {User} from '../user/User';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  private userService: UserService;
  private currentUser: User;
  private viewUser: User;
  private followers: User[];

  constructor(userService: UserService) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.viewUser = userService.getViewUser();
    this.followers = this.viewUser.getFollowers();
    console.log(this.followers);
  }

  ngOnInit() {
  }

}
