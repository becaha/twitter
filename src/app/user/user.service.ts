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
  private mockUser: User; // TODO get rid of and replace mockUser with currentUser
  private viewUser: User; // user displayed in page
  private dummyFollowers: User[];
  private dummyFollowing: User[];
  private mockAllUsers: User[] = [];
  private followService: FollowService;
  private statusesService: StatusesService;
  private proxy: ProxyService;
  // private mockAllStatuses: Status[] = [];

  constructor(followService: FollowService, statusesService: StatusesService, proxy: ProxyService) {
    this.followService = followService;
    this.statusesService = statusesService;
    this.proxy = proxy;
    // TODO: remove mock data

    // // currentUser should be in following2
    // this.dummyFollowers = [
    //   MOCK_USERS[2],
    //   MOCK_USERS[3],
    //   MOCK_USERS[4],
    //   MOCK_USERS[5]
    // ];
    //
    // // currentUser should be in followers2
    // this.dummyFollowing = [
    //   MOCK_USERS[6],
    //   MOCK_USERS[7],
    //   MOCK_USERS[8],
    //   MOCK_USERS[9]
    // ];
    //
    // this.mockUser = MOCK_USERS[10];
    // // current user's followers
    // // mock users 2-5 follow current user
    // this.followService.follow(MOCK_USERS[2], this.mockUser);
    // this.followService.follow(MOCK_USERS[3], this.mockUser);
    // this.followService.follow(MOCK_USERS[4], this.mockUser);
    // this.followService.follow(MOCK_USERS[5], this.mockUser);
    // // current user's following
    // // current user follows mock users 6-9
    // this.followService.follow(this.mockUser, MOCK_USERS[6]);
    // this.followService.follow(this.mockUser, MOCK_USERS[7]);
    // this.followService.follow(this.mockUser, MOCK_USERS[8]);
    // this.followService.follow(this.mockUser, MOCK_USERS[9]);
    //
    //
    // // add to user story
    // let status = MOCK_STATUSES[0];
    // status.addAttachment(new Attachment('twitter.jpg', 'image'));
    // // this.statusesService.addStatus(this.addStatus(this.mockUser, status));
    // // this.statusesService.addStatus(this.addStatus(this.mockUser, MOCK_STATUSES[1]));
    // status.setOwner(this.mockUser);
    // this.statusesService.addStatus(status);
    // const status
    // this.statusesService.addStatus(MOCK_STATUSES[1]);
    // this.addProfile(this.mockUser, 'redHat.jpg');
    // // add to user feed
    // for (const following of this.dummyFollowing) {
    //   this.statusesService.addStatus(this.addStatus(following,
    //     new Status(new Message(MOCK_STATUSES[2].getMessageText() + ' ' + following.getName()))));
    //   this.mockAllUsers.push(following);
    // }
    // for (const follower of this.dummyFollowers) {
    //   this.statusesService.addStatus(this.addStatus(follower,
    //     new Status(new Message(MOCK_STATUSES[3].getMessageText() + ' ' + follower.getName()))));
    //   this.mockAllUsers.push(follower);
    // }
    //
    // this.mockAllUsers.push(this.mockUser);
  }

  getAllUsers() {
    // TODO: not mock
    return this.mockAllUsers; // TODO: 3
  }

  getMockUser() {
    return this.mockUser;
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

  // getViewUser() {
  //   return this.viewUser;
  // }

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

  createUser(handle: string, password: string, name: string, followers: User[], following: User[], profile: Attachment) {
    const newUser = new User(handle, password, name, profile);
    MOCK_USERS.push(newUser); // TODO: 3
    return newUser;
  }

  public addProfile(user: User, src: string) {
    const profile = new Attachment(src, 'image');
    this.proxy.updateProfile(user.handle, profile);
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
