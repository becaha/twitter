import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {User} from '../user/User';

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

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.setIsFollowing();
  }

  setIsFollowing() {
    if (this.currentUser.getFollowing().includes(this.follow)) {
      this.isFollowing = true;
    } else {
      this.isFollowing = false;
    }
  }

  onFollow() {
    this.currentUser.follow(this.follow);
  }

  onUnfollow() {
    this.currentUser.unfollow(this.follow);
    // reset follows
    this.followUpdate.emit();
  }

}
