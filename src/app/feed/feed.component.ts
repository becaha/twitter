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
  private feedStatus: Status[] = []; // TODO: should be current -> oldest sorted

  constructor(userService: UserService) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    // feed should only be for current user
    this.following = this.currentUser.getFollowing();
    console.log('following', this.following);
    // this.setFeed();
  }

  ngOnInit() {
  }

  // public setFeed() {
  //   console.log(this.following);
  //   const followingStories = this.following.map(f => f.getStory());
  //   for (const story of followingStories) {
  //     console.log(story);
  //     this.feedStatus = this.feedStatus.concat(story);
  //   }
  //   console.log('feed status', this.feedStatus);
  // }

  // public getFeed() {
  //   return this.feedStatus;
  // }

}
