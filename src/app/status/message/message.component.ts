import {Component, Input, OnInit} from '@angular/core';

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
      let messageHTML = this.messageText;
      messageHTML = messageHTML.replace(regex, (text) => {
        // cut off hashtag
        text = text.substr(1);
        const link = '\"/search/' + text + '\"';
        return '<a routerLink=' + link + ' ng-reflect-router-link=' + link + ' href=' + link + '>#' + text + '</a>';
      });
      document.getElementById('messageText').innerHTML = messageHTML;
    }
  }

}
