import { Injectable } from '@angular/core';
import {User} from './User';
import {MOCK_USERS} from './mock-users';
import {MOCK_STATUSES} from '../statuses/mock-statuses';
import {Status} from '../status/Status';
import {Message} from '../status/message/Message';
import {Attachment} from '../status/attachment/Attachment';
import {StatusesService} from '../statuses/statuses.service';
import {ProxyService} from '../proxy.service';
import {FollowService} from '../follow/follow.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User; // logged in user
  private viewUser: User; // user displayed in page
  private followService: FollowService;
  private statusesService: StatusesService;
  private proxy: ProxyService;

  constructor(followService: FollowService, statusesService: StatusesService, proxy: ProxyService) {
    this.followService = followService;
    this.statusesService = statusesService;
    this.proxy = proxy;
  }

  setCurrentUser(currentUser: User) {
    this.currentUser = currentUser;
    // default user is the logged in current user
    this.viewUser = this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setViewUser(viewUser: User) {
    this.viewUser = viewUser;
  }

  async getUser(handle: string) {
    // const userByHandle = MOCK_USERS.filter(user => user.handle === handle);
    // return userByHandle[0];
    const user = await this.proxy.getUser(handle);
    // TODO: remove this, signup user
    if (user == null && this.currentUser.handle === handle) {
      return this.currentUser;
    }
    return user;
  }

  // TODO what type???
  public setProfile(user: User, profile: any) {
    // this.profile = profile;
    this.proxy.updateProfile(user.handle, profile);
  }

  public async signup(handle: string, password: string, name: string, attachmentSrc: string) {
    return await this.proxy.signupUser(handle, password, name, attachmentSrc);
  }

  public async getProfile(user: User) {
    return await this.proxy.getProfile(user.handle);
  }

  public async getFollowing(user: User) {
    return this.proxy.getFollowing(user.handle);
  }

  public async getFollowers(user: User) {
    return await this.proxy.getFollowers(user.handle);
  }

  public async getFeed(user: User) {
    return await this.proxy.getFeed(user.handle);
  }

  public async getStory(user: User) {
    return await this.proxy.getStory(user.handle);
  }
}
