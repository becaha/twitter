import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../status/Status';
import {User} from '../user/User';
import {Message} from '../status/Message/Message';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {
  @Input() owners: User[];
  private statuses: Status[] = [];
  private userService: UserService;
  private currentUser: User;
  private viewUser: User;
  private statusForm: boolean;
  private text: string;

  constructor(userService: UserService) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.viewUser = userService.getViewUser();
    this.statusForm = false;
  }

  ngOnInit() {
    this.setStatuses();
  }

  public setStatuses() {
    this.statuses = [];
    const stories = this.owners.map(f => f.getStory());
    for (const story of stories) {
      this.statuses = this.statuses.concat(story);
    }
    this.orderStatuses();
  }

  /**
   * orders statuses from oldest to newest
   * so when it prints out the cards, the oldest will be first
   * and it will be at the bottom
   */
  public orderStatuses() {
    this.statuses = this.statuses.sort((a, b) => {
      if (a.getDate().getTime() < b.getDate().getTime()) {
        return 1;
      } else if (a.getDate().getTime() === b.getDate().getTime()){
        return 0;
      }
      return -1;
    });
  }

  public getStatuses() {
    return this.statuses;
  }

  // on posting of the status, time stamp it with the current date
  public post() {
    const message = new Message(this.text);
    const newStatus = new Status(message, this.viewUser);
    this.currentUser.addStatus(newStatus);
    // close status form
    this.statusForm = false;
    // reset statuses
    this.setStatuses();
  }

  // cancel post
  public cancel() {
    // close status form
    this.statusForm = false;
  }
}
