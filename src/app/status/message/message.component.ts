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
    // console.log('id', this.statusId);
    this.parseMessage();
  }

  parseMessage() {
    this.messageText = this.messageStatus.getMessageText();
    let messageHTML = this.messageText;
    const foundLinks = this.linkifyService.find(this.messageText);
    if (foundLinks.length > 0) {
      // hashtags
      const hashtagRegex = /#[^\s]*(?=$|\s)/g;
      const hashtags: string[] = this.messageText.match(hashtagRegex);
      messageHTML = this.createMessageLinks(messageHTML, hashtags, '#', hashtagRegex);
      // urls
      const urlRegex = /http([^\s])*/g;
      const urls = this.messageText.match(urlRegex);
      if (urls != null) {
        messageHTML = messageHTML.replace(urlRegex, (text) => {
          const link = '\"' + text + '\"';
          return '<a href=' + link + '>' + text + '</a>';
        });
      }
      // user mentions
      const userMentionsRegex = /@([^\s])*/g;
      const userMentions: string[] = this.messageText.match(userMentionsRegex);
      messageHTML = this.createMessageLinks(messageHTML, userMentions, '@', userMentionsRegex);

      document.getElementById('messageText').innerHTML = messageHTML;

      this.addListeners('/search/', hashtags);
      this.addListeners('/story/', userMentions);
    }
  }

  createMessageLinks(messageHTML, messageLinks, symbol, regex) {
    if (messageLinks != null) {
      messageHTML = messageHTML.replace(regex, (text) => {
        // cut off starting symbol
        text = text.substr(1);
        const link = '\"/search/' + text + '\"';
        const inner = '<span id=\"' + text + '\"  style=\"cursor: pointer\">' + symbol + text + '</span>';
        return inner;
      });
    }
    return messageHTML;
  }

  // adds event listeners to the message links (hashtags and userMentions)
  addListeners(path: string, messageLinks: string[]) {
    // cut off starting symbol
    messageLinks = messageLinks.map((messageLink) => {
      return messageLink.substr(1);
    });
    for (const messageLink of messageLinks) {
      console.log(document.getElementById(messageLink));
      document.getElementById(messageLink).addEventListener('click', (event) => {
        this.onLinkClick(path, event);
      });
    }
  }

  // on messageLink click (hashtag or userMentions) route to path + id
  onLinkClick(path, event) {
    console.log(document.getElementById(this.messageStatus.getId()));
    const userMentionElement: Element = event.target;
    this.router.navigateByUrl(path + userMentionElement.id);
  }
}
