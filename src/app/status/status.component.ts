import {Component, Input, OnInit} from '@angular/core';
import {Message} from './Message/Message';
import {Status} from './Status';
import {UserService} from '../user/user.service';
import {User} from '../user/User';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() status: Status;
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
  }

}
