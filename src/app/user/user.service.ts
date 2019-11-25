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
  private proxy: ProxyService;
  private auth: string;

  constructor(proxy: ProxyService) {
    this.proxy = proxy;
  }

  getAuth() {
    return this.auth;
  }

  setAuth(auth: string) {
    this.auth = auth;
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
    return user;
  }

  async login(handle: string, password: string) {
    const response = await this.proxy.loginUser(handle, password);
    this.auth = response.authorization;
    return new User(response.handle, response.name);
  }

  async logout(handle: string) {
    const response = await this.proxy.logoutUser(handle);
    this.setCurrentUser(null);
    this.setViewUser(null);
    return response;
  }

  public async signup(handle: string, password: string, name: string) {
    const response = await this.proxy.signupUser(handle, password, name);
    this.auth = response.authorization;
    return new User(response.handle, response.name);
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
          users.push(new User(value.handle, value.name));
        }
      }
    );
    console.log('get users', users);
    return users;
  }
}
