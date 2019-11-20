import { Injectable } from '@angular/core';
import {User} from './User';
import {StatusesService} from '../statuses/statuses.service';
import {ProxyService} from '../proxy.service';
import {FollowService} from '../follow/follow.service';
import {UsersLastResponse} from './UsersLastResponse';

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
    const user = await this.proxy.getUser(handle);
    // TODO: remove this, signup user
    // if (user = null && this.currentUser.handle === handle) {
    //   return this.currentUser;
    // }
    return user;
  }

  // TODO what type???
  public setProfile(user: User, profile: any) {
    // this.profile = profile;
    this.proxy.updateProfile(user.handle, profile);
  }

  public async signup(handle: string, password: string, name: string) {
    // await this.proxy.
    return await this.proxy.signupUser(handle, password, name);
  }

  public async getProfile(user: User) {
    return await this.proxy.getProfile(user.handle);
  }

  public async getFollowing(user: User, lastUserHandle?: string, lastFollowHandle?: string) {
    const response = await this.proxy.getFollowing(user.handle, lastUserHandle, lastFollowHandle);
    return this.extractUsersResponse(response);
  }

  public async getFollowers(user: User, lastUserHandle?: string, lastFollowHandle?: string) {
    const response = await this.proxy.getFollowers(user.handle, lastUserHandle, lastFollowHandle);
    console.log('get followers', response);
    return this.extractUsersResponse(response);
  }

  extractUsersResponse(response) {
    console.log('users response', response);
    const follows = this.extractUsers(response);
    const nextUserHandle = response.userHandle;
    const nextFollowHandle = response.followHandle;
    return new UsersLastResponse(follows, nextUserHandle, nextFollowHandle);
  }

  isBlankUser(user) {
    return user.handle === '';
  }

  extractUsers(response) {
    console.log('users', response);
    const users: User[] = [];
    response.users.forEach((value, index, array) => {
        if (!this.isBlankUser(value)) {
          users.push(new User(value.handle, value.password, value.name));
        }
      }
    );
    console.log('get users', users);
    return users;
  }
}
