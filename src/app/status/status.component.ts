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

  constructor(userService: UserService, statusesService: StatusesService, route: ActivatedRoute) {
    this.userService = userService;
    this.statusesService = statusesService;
    this.route = route;
  }

  ngOnInit() {
    // stand alone status has status id in route params
    this.route.paramMap.subscribe((paramMap) => {
      const singleStatus = this.statusesService.getStatus(paramMap.get('id'));
      if (singleStatus) {
        this.status = singleStatus;
        this.isSingleStatus = true;
      }
    });
  }

}
