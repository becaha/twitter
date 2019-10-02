import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxLinkifyjsService, Link, LinkType, NgxLinkifyOptions} from 'ngx-linkifyjs';
import {Status} from '../Status';
import {element} from 'protractor';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageStatus: Status;
  private userService: UserService;
  private router: Router;
  private linkifyService: NgxLinkifyjsService;
  private statusId: string;

  private options: NgxLinkifyOptions =
    {
      attributes: null,
      className: 'linkified',
      defaultProtocol: 'http',
      events: null,
      format: (value, type) => {
        return value;
      },
      formatHref: (href, type) => {
        if (type === 'hashtag') {
          // cut off hashtag
          const text = href.substr(1);
          href = '/search/' + text;
          console.log('hash', href);
        } else if (type === 'mention') {
          // cut off @
          const userMention = href.substr(1);
          href = '/story/' + userMention;
          console.log('mention', href);
        }
        return href;
      },
      ignoreTags: [],
      nl2br: false,
      tagName: 'a',
      target: {
        url: '_blank'
      },
      validate: true
    };

  constructor(userService: UserService, router: Router, linkifyService: NgxLinkifyjsService) {
    this.userService = userService;
    this.router = router;
    this.linkifyService = linkifyService;
  }

  ngOnInit() {
    this.statusId = this.messageStatus.getId();
    console.log('id', this.statusId);
    this.parseMessage();
  }

  parseMessage() {
    const foundLinks = this.linkifyService.find(this.messageStatus.getMessageText());
    if (foundLinks.length > 0) {
      const inner = this.linkifyService.linkify(this.messageStatus.getMessageText(), this.options);
      document.getElementById('messageText').innerHTML = inner;
    }
  }



  onHashtagClick(event) {
    this.router.navigateByUrl('/search');
    console.log(event);
  }

}
