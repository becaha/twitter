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
    // return user.getFollowing().includes(following);
    return await this.proxy.isFollowing(user.handle, following.handle);
  }

  // not called by UI!!
  // someone (called a follower) follows the user
  // add follower to user
  public addFollower(user: User, follower: User) {
    // this.followers.push(follower);
  }

  // user unfollows another user (called a following)
  // user is removed from that other user's followers
  public unfollow(user: User, following: User) {
    // this.following = this.following.filter(f => f.handle !== following.handle);
    // following.followers = following.getFollowers().filter(f => f.handle !== this.handle);
    this.proxy.unfollow(user.handle, following.handle);
  }

  // user follows another user (called a following)
  // add following to user and add user follow to following
  public follow(user: User, following: User) {
    // this.following.push(following);
    // following.addFollower(this);
    this.proxy.follow(user.handle, following.handle);
  }

}
