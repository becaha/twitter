import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user/User';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  // user following or follower
  @Input() follow: User;
  // dummyUser = new User('hannahbanana', 'password', 'Hannah Klenton', [], [], '');

  constructor() { }

  ngOnInit() {
  }

}
