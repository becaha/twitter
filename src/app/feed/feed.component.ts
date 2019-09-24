import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {Status} from '../status/Status';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  private userService: UserService;
  private currentUser: User;
  private following: User[];
  private feedStatus: Status[]; // TODO: should be current -> oldest sorted

  constructor(userService: UserService) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    // feed should only be for current user
    this.following = this.currentUser.getFollowing();
  }

  ngOnInit() {
  }

  // TODO: should be status service
  public setFeed() {
    for (const f of this.following) {
      this.feedStatus.concat(f.getStory());
    }
  }

  public getFeed() {
    return this.feedStatus;
  }

}
