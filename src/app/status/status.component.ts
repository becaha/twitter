import {Component, Input, OnInit} from '@angular/core';
import {Message} from './message/Message';
import {Status} from './Status';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {ActivatedRoute} from '@angular/router';
import {StatusesService} from '../statuses/statuses.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() status: Status;
  private userService: UserService;
  private statusesService: StatusesService;
  private route: ActivatedRoute;
  private isSingleStatus: boolean;
  private singleStatusId: string;

  constructor(userService: UserService, statusesService: StatusesService, route: ActivatedRoute) {
    this.userService = userService;
    this.statusesService = statusesService;
    this.route = route;
  }

  /**
   * gets a single status id from the route parameters
   * to display a status view
   * if no parameter 'id', it is not a single status view
   */
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.singleStatusId = (paramMap.get('id'));
      if (this.singleStatusId) {
        this.getSingleStatus();
      }
      console.log('status', this.status);
    });
  }

  async getSingleStatus() {
    const singleStatus = await this.statusesService.getStatus(this.singleStatusId);
    if (singleStatus) {
      this.status = singleStatus;
      this.isSingleStatus = true;
    }
  }

}
