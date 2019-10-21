import { Injectable } from '@angular/core';
import {User} from './User';
import {MOCK_USERS} from './mock-users';
import {MOCK_STATUSES} from '../statuses/mock-statuses';
import {Status} from '../status/Status';
import {Message} from '../status/message/Message';
import {Attachment} from '../status/attachment/Attachment';
import {StatusesService} from '../statuses/statuses.service';

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
  private statusesService: StatusesService;
  // private mockAllStatuses: Status[] = [];

  constructor(statusesService: StatusesService) {
    this.statusesService = statusesService;
    // TODO: remove mock data

    // currentUser should be in following2
    this.dummyFollowers = [
      MOCK_USERS[2],
      MOCK_USERS[3],
      MOCK_USERS[4],
      MOCK_USERS[5]
    ];

    // currentUser should be in followers2
    this.dummyFollowing = [
      MOCK_USERS[6],
      MOCK_USERS[7],
      MOCK_USERS[8],
      MOCK_USERS[9]
    ];

    this.mockUser = MOCK_USERS[10];
    // current user's followers
    // mock users 2-5 follow current user
    MOCK_USERS[2].follow(this.mockUser);
    MOCK_USERS[3].follow(this.mockUser);
    MOCK_USERS[4].follow(this.mockUser);
    MOCK_USERS[5].follow(this.mockUser);
    // current user's following
    // current user follows mock users 6-9
    this.mockUser.follow(MOCK_USERS[6]);
    this.mockUser.follow(MOCK_USERS[7]);
    this.mockUser.follow(MOCK_USERS[8]);
    this.mockUser.follow(MOCK_USERS[9]);


    // add to user story
    const status = MOCK_STATUSES[0];
    status.addAttachment(new Attachment('twitter.jpg', 'image'));
    this.statusesService.addStatus(this.mockUser.addStatus(status));
    this.statusesService.addStatus(this.mockUser.addStatus(MOCK_STATUSES[1]));
    this.mockUser.addProfile('redHat.jpg');
    // add to user feed
    for (const following of this.dummyFollowing) {
      this.statusesService.addStatus(following.addStatus(
        new Status(new Message(MOCK_STATUSES[2].getMessageText() + ' ' + following.getName()))));
      this.mockAllUsers.push(following);
    }
    for (const follower of this.dummyFollowers) {
      this.statusesService.addStatus(follower.addStatus(
        new Status(new Message(MOCK_STATUSES[3].getMessageText() + ' ' + follower.getName()))));
      this.mockAllUsers.push(follower);
    }

    this.mockAllUsers.push(this.mockUser);
  }

  getAllUsers() {
    // TODO: not mock
    return this.mockAllUsers;
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

  getUser(handle: string) {
    const userByHandle = MOCK_USERS.filter(user => user.handle === handle);
    return userByHandle[0];
  }

  createUser(handle: string, password: string, name: string, followers: User[], following: User[], profile: Attachment) {
    const newUser = new User(handle, password, name, followers, following, profile);
    MOCK_USERS.push(newUser);
    return newUser;
  }
}
