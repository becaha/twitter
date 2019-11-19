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
  private lastUserHandle: string = null;
  private lastFollowHandle: string = null;

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
    await this.getFollowing();
  }

  async getFollowing() {
    const response = await this.userService.getFollowing(this.viewUser, this.lastUserHandle, this.lastFollowHandle);
    this.following = response.getUsers();
    this.lastUserHandle = response.getUserHandle();
    this.lastFollowHandle = response.getFollowHandle();
  }


  /**
   * receives follow update
   * (user has followed/unfollowed another user)
   * re-fetch view users following
   * @param event
   */
  async receiveFollowUpdate(event) {
    await this.getFollowing();
    console.log(this.following);
  }

  async receiveMoreFollowsUpdate(event) {
    const response = await this.userService.getFollowing(this.viewUser, this.lastUserHandle, this.lastFollowHandle);
    this.following = this.following.concat(response.getUsers());
    this.lastUserHandle = response.getUserHandle();
    this.lastFollowHandle = response.getFollowHandle();
    console.log(this.following);
  }

}
