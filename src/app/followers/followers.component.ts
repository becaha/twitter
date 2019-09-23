import { Component, OnInit } from '@angular/core';
import {User} from '../login/User';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  dummyUser = new User('hmm', 'password', 'Hannah');

  constructor() { }

  ngOnInit() {
  }

}
