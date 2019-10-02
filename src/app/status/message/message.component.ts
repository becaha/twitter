import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageText: string;
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.parseMessage();
  }

  parseMessage() {
    const regex = /#[^\s]*(?=$|\s)/g;
    const hashtags = this.messageText.match(regex);
    if (hashtags !== null) {
      let messageHTML = this.messageText;
      messageHTML = messageHTML.replace(regex, (text) => {
        // cut off hashtag
        text = text.substr(1);
        const link = '\"/search/' + text + '\"';
        return '<a routerLink=' + link + ' ng-reflect-router-link=' + link + ' href=' + link + '>#' + text + '</a>';
      });
      // <a _ngcontent-kqs-c6="" id="link" ng-reflect-router-link="/search/#" href="/search/%23">#</a>
      document.getElementById('messageText').innerHTML = messageHTML;
      console.log(document.getElementById('messageText'));
      console.log(document.getElementById('link'));
    }
  }

}
