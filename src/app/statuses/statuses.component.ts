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
  private viewUser: User;
  private statusForm: boolean;
  private text: string;

  constructor(userService: UserService) {
    this.userService = userService;
    this.viewUser = userService.getViewUser();
    this.statusForm = false;
  }

  ngOnInit() {
    this.setStatuses();
  }

  public setStatuses() {
    console.log(this.owners);
    const stories = this.owners.map(f => f.getStory());
    for (const story of stories) {
      console.log(story);
      this.statuses = this.statuses.concat(story);
    }
    console.log('statuses', this.statuses);
  }

  public getStatuses() {
    return this.statuses;
  }

  // on posting of the status, time stamp it with the current date
  public post() {
    const message = new Message(this.text);
    const newStatus = new Status(message, this.viewUser);
  }
}
