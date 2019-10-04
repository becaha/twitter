import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user/User';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {
  @Input() follows: User[];
  // @Input() followUpdate: Event;
  @Output() updateFollows = new EventEmitter();
  private followsArray;

  constructor() { }

  ngOnInit() {
    this.followsArray = Array(this.follows.length / 4);
  }

  createArray(num: number) {
    console.log(Array(num));
    return Array(num);
  }

  receiveUpdate(event) {
    this.updateFollows.emit();
  }
}
