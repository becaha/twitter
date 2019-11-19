import {User} from './User';

export class UsersLastResponse {
  private users: User[];
  private userHandle: string;
  private followHandle: string;

  constructor(users: User[], userHandle: string, followHandle: string) {
    this.users = users;
    this.userHandle = userHandle;
    this.followHandle = followHandle;
  }

  getUsers() {
    return this.users;
  }

  getUserHandle() {
    return this.userHandle;
  }

  getFollowHandle() {
    return this.followHandle;
  }
}
