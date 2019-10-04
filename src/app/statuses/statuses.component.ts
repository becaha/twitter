import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../status/Status';
import {User} from '../user/User';
import {Message} from '../status/message/Message';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';
import {StatusesService} from './statuses.service';

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
  private route: ActivatedRoute;
  private statusesService: StatusesService;

  constructor(userService: UserService, statusesService: StatusesService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.route = route;
    this.statusForm = false;
    this.statusesService = statusesService;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.viewUser = this.userService.getUser(paramMap.get('handle'));
      if (this.viewUser == null) {
        this.viewUser = this.userService.getCurrentUser();
      }
    });
  }

  public getStatuses() {
    this.statuses = [];
    let stories = this.owners.map(f => f.getStory());
    // if it is a feed and not a story we have to add the current user to its following
    if (this.owners.length !== 1) {
      stories = stories.concat(this.currentUser.getStory());
    }
    for (const story of stories) {
      this.statuses = this.statuses.concat(story);
    }
    this.statuses = this.statusesService.orderStatuses(this.statuses);
    return this.statuses;
  }

  // on posting of the status, time stamp it with the current date
  public post() {
    const message = new Message(this.text);
    const newStatus = new Status(message, this.viewUser);
    this.statusesService.addStatus(this.currentUser.addStatus(newStatus));
    // close status form
    this.statusForm = false;
    // reset statuses
    // this.setStatuses();
  }

  // cancel post
  public cancel() {
    // close status form
    this.statusForm = false;
  }
}
