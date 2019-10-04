import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxLinkifyjsService, Link, LinkType, NgxLinkifyOptions} from 'ngx-linkifyjs';
import {Status} from '../Status';
import {element} from 'protractor';
import {hasLifecycleHook} from '@angular/compiler/src/lifecycle_reflector';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageStatus: Status;
  private userService: UserService;
  private router: Router;
  private statusId: string;
  private messageText: string;


  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {
    this.statusId = this.messageStatus.getId();
  }

  onMessageClick(event) {
    console.log(event.target.innerText);
    const spanText = event.target.innerText;
    const messageLink = spanText.substr(1);
    const symbol = spanText.substr(0, 1);
    if (symbol === '#') {
      this.router.navigateByUrl('/search/' + messageLink);
    } else if (symbol === '@') {
      this.router.navigateByUrl('/story/' + messageLink);
    } else {
      // urls
      location.href = spanText;
    }
  }
}
