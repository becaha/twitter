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
  private viewUserHandle: string;
  private followers: User[];
  private route: ActivatedRoute;
  private lastUserHandle: string = null;
  private lastFollowHandle: string = null;

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.route = route;
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.viewUserHandle = paramMap.get('handle');
      this.getViewUser();
    });
  }

  async getViewUser() {
    this.viewUser = await this.userService.getUser(this.viewUserHandle);
    await this.getFollowers();
  }

  async getFollowers() {
    const response = await this.userService.getFollowers(this.viewUser, this.lastUserHandle, this.lastFollowHandle);
    this.followers = response.getUsers();
    this.lastUserHandle = response.getUserHandle();
    this.lastFollowHandle = response.getFollowHandle();
  }

  /**
   * receives follow update
   * (user has been followed/unfollowed by another user)
   * re-fetch view users followers
   * @param event
   */
  async receiveFollowUpdate(event) {
    await this.getFollowers();
    console.log(this.followers);
  }

  async receiveMoreFollowsUpdate(event) {
    const response = await this.userService.getFollowers(this.viewUser, this.lastUserHandle, this.lastFollowHandle);
    this.followers = this.followers.concat(response.getUsers());
    this.lastUserHandle = response.getUserHandle();
    this.lastFollowHandle = response.getFollowHandle();
    console.log(this.followers);
  }
}
