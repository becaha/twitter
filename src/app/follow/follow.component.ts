import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {FollowService} from './follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
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

  ngOnInit() {
    this.setIsFollowing();
  }

  setIsFollowing() {
    if (this.followService.isFollowing(this.currentUser, this.follow)) {
      this.isFollowing = true;
    } else {
      this.isFollowing = false;
    }
  }

  onFollow() {
    this.currentUser.follow(this.follow);
    this.isFollowing = true;
  }

  onUnfollow() {
    this.currentUser.unfollow(this.follow);
    this.isFollowing = false;
    // reset follows
    this.followUpdate.emit();
  }

}
