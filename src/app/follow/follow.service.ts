import { Injectable } from '@angular/core';
import {User} from '../user/User';
import {ProxyService} from '../proxy.service';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private proxy: ProxyService;
  private userService: UserService;

  constructor(proxy: ProxyService, userService: UserService) {
    this.userService = userService;
    this.proxy = proxy;
  }

  // checks if user is following following
  async isFollowing(user: User, following: User) {
    return await this.proxy.isFollowing(user.handle, following.handle);
  }

  // user unfollows another user (called a following)
  public unfollow(user: User, following: User) {
    const auth = this.userService.getAuth();
    this.proxy.unfollow(user.handle, following.handle, auth);
  }

  // user follows another user (called a following)
  public follow(user: User, following: User) {
    const auth = this.userService.getAuth();
    this.proxy.follow(user.handle, following.handle, auth);
  }

}
