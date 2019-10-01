import { Injectable } from '@angular/core';
import {User} from './User';
import {MOCK_USERS} from './mock-users';
import {MOCK_STATUSES} from '../status/mock-statuses';
import {Status} from '../status/Status';
import {Message} from '../status/Message/Message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User; // logged in user
  private viewUser: User; // user displayed in page
  private dummyFollowers: User[];
  private dummyFollowing: User[];

  constructor() {
    // TODO: remove mock data
    const dummyFollowers2 = [MOCK_USERS[0]];

    const dummyFollowing2 = [MOCK_USERS[1]];

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

    this.currentUser = MOCK_USERS[10];
    // current user's followers
    // mock users 2-5 follow current user
    MOCK_USERS[2].follow(this.currentUser);
    MOCK_USERS[3].follow(this.currentUser);
    MOCK_USERS[4].follow(this.currentUser);
    MOCK_USERS[5].follow(this.currentUser);
    // current user's following
    // current user follows mock users 6-9
    this.currentUser.follow(MOCK_USERS[6]);
    this.currentUser.follow(MOCK_USERS[7]);
    this.currentUser.follow(MOCK_USERS[8]);
    this.currentUser.follow(MOCK_USERS[9]);


    // add to user story
    this.currentUser.addStatus(MOCK_STATUSES[0]);
    this.currentUser.addStatus(MOCK_STATUSES[1]);
    this.currentUser.addProfile('redHat.jpg');
    // add to user feed
    for (const following of this.dummyFollowing) {
      following.addStatus(new Status(new Message(MOCK_STATUSES[2].getMessageText() + ' ' + following.getName())));
    }
    for (const follower of this.dummyFollowers) {
      follower.addStatus(new Status(new Message(MOCK_STATUSES[3].getMessageText() + ' ' + follower.getName())));
    }

    // default user is the logged in current user
    this.viewUser = this.currentUser;
  }

  setCurrentUser(currentUser: User) {
    this.currentUser = currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setViewUser(viewUser: User) {
    this.viewUser = viewUser;
  }

  getViewUser() {
    return this.viewUser;
  }

  getUser(handle: string) {
    const userByHandle = MOCK_USERS.filter(user => user.handle === handle);
    console.log(userByHandle, MOCK_USERS);
    return userByHandle[0];
  }
}
