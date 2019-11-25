import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {User} from '../user/User';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowsComponent implements OnInit {
  @Input() follows: User[];
  @Output() updateFollows = new EventEmitter();
  @Output() getMoreFollows = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('follows on init', this.follows);
    window.scrollTo(0, 0);
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      // bottom of the page
      console.log('scrolled to bottom');
      this.getMoreFollows.emit();
    }
  }
}
