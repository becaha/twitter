import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {Status} from '../status/Status';
import {StatusesService} from '../statuses/statuses.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  private userService: UserService;
  private statusesService: StatusesService;
  private currentUser: User;
  private statuses: Status[] = [];
  private lastHandle;
  private lastTimestamp;
  private noMore = false;
  private awaiting = false;

  constructor(userService: UserService, statusesService: StatusesService) {
    this.userService = userService;
    this.statusesService = statusesService;
    this.currentUser = userService.getCurrentUser();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getFeed();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - .5) {
      console.log('scroll bottom');
      // bottom of the page
      this.getFeed();
    }
  }

  async getFeed() {
    if (this.noMore || this.awaiting) {
      return [];
    }
    this.awaiting = true;
    const statusesResponse = await this.statusesService.getFeed(this.currentUser, this.lastHandle, this.lastTimestamp);
    this.statuses = this.statuses.concat(statusesResponse.statuses);
    this.lastHandle = statusesResponse.lastHandle;
    this.lastTimestamp = statusesResponse.lastTimestamp;
    this.awaiting = false;
    if (!this.lastHandle && !this.lastTimestamp) {
      this.noMore = true;
    } else {
      this.noMore = false;
    }
  }

}
