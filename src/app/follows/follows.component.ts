import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user/User';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {
  @Input() follows: User[];

  constructor() { }

  ngOnInit() {
  }

  createArray(num: number) {
    console.log(Array(num));
    return Array(num);
  }
}
