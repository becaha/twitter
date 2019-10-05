import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {ActivatedRoute} from '@angular/router';

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
  private route: ActivatedRoute;

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.route = route;
  }

  /**
   * gets view user from the route parameters by
   * getting user by handle from the user service
   */
  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.viewUser = this.userService.getUser(paramMap.get('handle'));
      this.following = this.viewUser.getFollowing();
    });
  }

  /**
   * receives follow update
   * (user has followed/unfollowed another user)
   * re-fetch view users following
   * @param event
   */
  receiveFollowUpdate(event) {
    this.following = this.viewUser.getFollowing();
  }

}
