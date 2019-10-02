import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageText: string;
  private userService: UserService;
  private router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {
    this.parseMessage();
  }

  parseMessage() {
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

  onHashtagClick(event) {
    this.router.navigateByUrl('/search');
    console.log(event);
  }

}
