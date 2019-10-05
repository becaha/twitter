import { Component, OnInit } from '@angular/core';
import {User} from '../user/User';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';

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
  private route: ActivatedRoute;

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.route = route;
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.viewUser = this.userService.getUser(paramMap.get('handle'));
      this.followers = this.viewUser.getFollowers();
    });
  }

  /**
   * receives follow update
   * (user has been followed/unfollowed by another user)
   * re-fetch view users followers
   * @param event
   */
  receiveFollowUpdate(event) {
    this.followers = this.viewUser.getFollowers();
  }
}
