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
  private messageText: string;

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
    this.messageText = this.messageStatus.getMessageText();
    const foundLinks = this.linkifyService.find(this.messageText);
    if (foundLinks.length > 0) {
      // const inner = this.linkifyService.linkify(this.messageText, this.options);
      // document.getElementById('messageText').innerHTML = inner;
      // console.log(document.getElementById('messageText'));
      // console.log(document.getElementById('link'));


      const hashtagRegex = /#[^\s]*(?=$|\s)/g;
      const hashtags = this.messageText.match(hashtagRegex);
      let messageHTML = this.messageText;
      if (hashtags !== null) {
        messageHTML = messageHTML.replace(hashtagRegex, (text) => {
          // cut off hashtag
          text = text.substr(1);
          const link = '\"/search/' + text + '\"';
          return '<a routerLink=' + link + ' ng-reflect-router-link=' + link + ' href=' + link + '>#' + text + '</a>';
        });
      }
      const urlRegex = /http([^\s])*/g;
      const urls = this.messageText.match(urlRegex);
      if (urls != null) {
        messageHTML = messageHTML.replace(urlRegex, (text) => {
          const link = '\"' + text + '\"';
          return '<a href=' + link + '>' + text + '</a>';
        });
      }
      const userMentionsRegex = /@([^\s])*/g;
      const userMentions = this.messageText.match(userMentionsRegex);
      if (userMentions != null) {
        messageHTML = messageHTML.replace(userMentionsRegex, (text) => {
          // cut off @
          text = text.substr(1);
          const link = '\"/search/' + text + '\"';
          return '<a routerLink=' + link + ' ng-reflect-router-link=' + link + ' href=' + link + '>@' + text + '</a>';
        });
      }
      // <a _ngcontent-kqs-c6="" id="link" ng-reflect-router-link="/search/#" href="/search/%23">#</a>
      document.getElementById('messageText').innerHTML = messageHTML;
      console.log(document.getElementById('messageText'));
      console.log(document.getElementById('link'));
    }
  }



  onHashtagClick(event) {
    this.router.navigateByUrl('/search');
    console.log(event);
  }

}
