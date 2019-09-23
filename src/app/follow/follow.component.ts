import { Component, OnInit } from '@angular/core';
import {User} from '../login/User';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  dummyUser = new User('hannahbanana', 'password', 'Hannah Klenton');

  constructor() { }

  ngOnInit() {
  }

}
