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
  private statuses: Status[];

  constructor(userService: UserService) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
  }

  ngOnInit() {
    this.getFeed();
  }

  async getFeed() {
    console.log('get feed high');
    this.statuses = await this.userService.getFeed(this.currentUser);
    console.log('got feed', this.statuses);
  }

}
