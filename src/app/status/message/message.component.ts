import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxLinkifyjsService, Link, LinkType, NgxLinkifyOptions} from 'ngx-linkifyjs';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageText: string;
  private userService: UserService;
  private router: Router;
  private linkifyService: NgxLinkifyjsService;

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
    this.parseMessage();
  }

  parseMessage() {
    const inner = this.linkifyService.linkify(this.messageText, this.options);
    document.getElementById('messageText').innerHTML = inner;

    console.log('linkify', document.getElementById('messageText'));
  }



  onHashtagClick(event) {
    this.router.navigateByUrl('/search');
    console.log(event);
  }

}
