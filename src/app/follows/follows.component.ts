import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user/User';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {
  @Input() follows: User[];
  @Output() updateFollows = new EventEmitter();
  private followsArray;

  constructor() { }

  ngOnInit() {
    const rows = Math.ceil(this.follows.length / 4);
    console.log(rows);
    this.followsArray = Array(rows);
  }

  createArray(num: number) {
    return Array(num);
  }

  receiveUpdate(event) {
    this.updateFollows.emit();
  }
}
