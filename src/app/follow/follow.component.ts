import {Component, Input, OnInit} from '@angular/core';
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
  private router: Router;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
  }

  ngOnInit() {
  }

}
