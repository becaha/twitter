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
    this.followsArray = Array(rows);
  }

  createArray(num: number) {
    return Array(num);
  }

  /**
   * receives follow update
   * (user has followed/unfollowed another user)
   * send update to parent component
   * @param event
   */
  receiveFollowUpdate(event) {
    this.updateFollows.emit();
  }
}
