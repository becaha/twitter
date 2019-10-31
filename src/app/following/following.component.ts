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
  private viewUserHandle: string;
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
      this.viewUserHandle = paramMap.get('handle');
      this.getViewUser();
    });
  }

  async getViewUser() {
    this.viewUser = await this.userService.getUser(this.viewUserHandle);
    this.following = await this.userService.getFollowing(this.viewUser);
  }


  /**
   * receives follow update
   * (user has followed/unfollowed another user)
   * re-fetch view users following
   * @param event
   */
  async receiveFollowUpdate(event) {
    this.following = await this.userService.getFollowing(this.viewUser);
  }

}
