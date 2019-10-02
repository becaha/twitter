import {Component, Input, OnInit} from '@angular/core';
import {Message} from './Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageText: string;

  constructor() { }

  ngOnInit() {
    this.parseMessage();
  }

  parseMessage() {
    const regex = /#[^\s]*(?=$|\s)/g;
    const hashtags = this.messageText.match(regex);
    if (hashtags !== null) {
      const element = document.getElementById('messageText');
      let messageHTML = this.messageText;
      // console.log('messageText', this.messageText);
      messageHTML = messageHTML.replace(regex, (text) => {
        // cut off hashtag
        text = text.substr(1);
        const link = '\"/search/' + text + '\"';
        return '<a routerLink=' + link + ' ng-reflect-router-link=' + link + ' href=' + link + '>#' + text + '</a>';
      });
      // console.log(messageHTML);
      document.getElementById('messageText').innerHTML = messageHTML;
      // element = document.getElementById('messageText');
      // console.log(element);
      // console.log(document.getElementById('dummy'));
    }
  }

}
