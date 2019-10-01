import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {Status} from '../status/Status';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  private userService: UserService;
  private currentUser: User;
  private following: User[];

  constructor(userService: UserService) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    // feed should only be for current user
    this.following = this.currentUser.getFollowing();
  }

  ngOnInit() {
  }

}
