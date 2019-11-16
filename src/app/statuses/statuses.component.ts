import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../status/Status';
import {User} from '../user/User';
import {Message} from '../status/message/Message';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';
import {StatusesService} from './statuses.service';
import {Attachment} from '../status/attachment/Attachment';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {
  // @Input() owners: User[];
  @Input() statuses: Status[] = [];
  // private statuses: Status[] = [];
  private userService: UserService;
  private currentUser: User;
  private viewUser: User;
  private viewUserHandle: string;
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

  /**
   * gets the viewUser from the route parameters by
   * getting the user by handle from the user service
   */
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.viewUserHandle = paramMap.get('handle');
      if (this.viewUser == null) {
        this.viewUser = this.userService.getCurrentUser();
      }
    });
  }

  async getViewUser() {
    this.viewUser = await this.userService.getUser(this.viewUserHandle);
  }

  /**
   * gets the statuses of the owners
   * the owners are the users whose statuses are to be displayed
   * (a story user or a user following)
   */
  // public async getStatuses() {
  //   await this.getViewUser();
  //   this.statuses = [];
  //   let stories = this.owners.map(f => f.getStory());
  //   // if it is a feed and not a story we have to add the current user to its following
  //   if (this.owners.length !== 1) {
  //     stories = stories.concat(this.currentUser.getStory());
  //   }
  //   for (const story of stories) {
  //     this.statuses = this.statuses.concat(story);
  //   }
  //   this.statuses = this.statusesService.orderStatuses(this.statuses);
  //   return this.statuses;
  // }

  /** on posting of the status,
   * time stamp it with the current date and
   * add it to the current user's statuses
   */
  public post() {
    const message = new Message(this.text);
    //  constructor(message: Message, ownerHandle: string, profile: Attachment, attachment?: Attachment, date?: string, id?: string) {
    const newStatus = new Status(message, this.viewUser.getHandle());
    this.statusesService.addStatus(newStatus);
    // close status form
    this.statusForm = false;
  }

  /**
   * cancel post
   */
  public cancel() {
    // close status form
    this.statusForm = false;
  }
}
