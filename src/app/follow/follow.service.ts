import { Injectable } from '@angular/core';
import {User} from '../user/User';
import {ProxyService} from '../proxy.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private proxy: ProxyService;

  constructor(proxy: ProxyService) {
    this.proxy = proxy;
  }

  // checks if user is following following
  async isFollowing(user: User, following: User) {
    return await this.proxy.isFollowing(user.handle, following.handle);
  }

  // user unfollows another user (called a following)
  public unfollow(user: User, following: User) {
    this.proxy.unfollow(user.handle, following.handle);
  }

  // user follows another user (called a following)
  public follow(user: User, following: User) {
    this.proxy.follow(user.handle, following.handle);
  }

}
