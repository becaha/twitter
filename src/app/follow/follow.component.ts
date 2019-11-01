import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {FollowService} from './follow.service';
import {Attachment} from '../status/attachment/Attachment';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FollowComponent implements OnInit {
  // user following or follower
  @Input() follow: User;
  @Output() followUpdate = new EventEmitter();
  private router: Router;
  private userService: UserService;
  private isFollowing: boolean;
  private currentUser: User;
  private followService: FollowService;

  constructor(router: Router, userService: UserService, followService: FollowService) {
    this.router = router;
    this.userService = userService;
    this.followService = followService;
    this.currentUser = this.userService.getCurrentUser();

  }

  async ngOnInit() {
    await this.setIsFollowing();
  }

  /**
   * if current user is following the displayed follow user,
   * sets isFollowing to true
   */
  async setIsFollowing() {
    this.isFollowing = await this.followService.isFollowing(this.currentUser, this.follow);
  }

  /**
   * current user follows the displayed follow user
   */
  onFollow() {
    this.followService.follow(this.currentUser, this.follow);
    this.isFollowing = true;
  }

  /**
   * current user unfollows the displayed follow user
   */
  onUnfollow() {
    this.followService.unfollow(this.currentUser, this.follow);
    this.isFollowing = false;
    // reset follows
    // TODO: refresh
    // this.followUpdate.emit();
  }

}
