import { Injectable } from '@angular/core';
import {User} from '../user/User';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor() { }

  // checks if user is following following
  isFollowing(user: User, following: User) {
    return user.getFollowing().includes(following);
  }
}
