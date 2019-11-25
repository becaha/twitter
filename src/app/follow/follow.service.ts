import { Injectable } from '@angular/core';
import {User} from '../user/User';
import {ProxyService} from '../proxy.service';
import {UserService} from '../user/user.service';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private proxy: ProxyService;
  private userService: UserService;
  private authService: AuthService;

  constructor(proxy: ProxyService, userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.proxy = proxy;
    this.authService = authService;
  }

  // checks if user is following following
  async isFollowing(user: User, following: User) {
    return await this.proxy.isFollowing(user.handle, following.handle);
  }

  // user unfollows another user (called a following)
  async unfollow(user: User, following: User) {
    const auth = this.userService.getAuth();
    const response = await this.proxy.unfollow(user.handle, following.handle, auth);
    await this.authService.checkAuthorized(user.handle, response);
  }

  // user follows another user (called a following)
  async follow(user: User, following: User) {
    const auth = this.userService.getAuth();
    const response = await this.proxy.follow(user.handle, following.handle, auth);
    await this.authService.checkAuthorized(user.handle, response);
  }

}
