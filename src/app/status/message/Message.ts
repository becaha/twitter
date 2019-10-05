import {User} from '../../user/User';
import has = Reflect.has;

export class Message {
  private text: string;
  private hashtags: Set<string>; // no duplicates
  private userMentions: Set<string>;
  private urls: Set<string>;
  private innerHTML: string;

  constructor(text: string) {
    this.text = text;
    this.setHashtags();
    this.setUserMentions();
    this.setInnerHTML();
  }

  getInnerHTML() {
    return this.innerHTML;
  }

  setInnerHTML() {
    let messageHTML = this.text;
    // hashtags
    const hashtagRegex = /#[^\s]*(?=$|\s)/g;
    const hashtags: string[] = this.text.match(hashtagRegex);
    messageHTML = this.createMessageLinks(messageHTML, hashtags, '#', hashtagRegex);
    // urls
    const urlRegex = /http([^\s])*/g;
    const urls = this.text.match(urlRegex);
    if (urls != null) {
        messageHTML = messageHTML.replace(urlRegex, (text) => {
          const link = '\"' + text + '\"';
          return '<a href=' + link + ' target="_blank">' + text + '</a>';
        });
      }
    // user mentions
    const userMentionsRegex = /@([^\s])*/g;
    const userMentions: string[] = this.text.match(userMentionsRegex);
    messageHTML = this.createMessageLinks(messageHTML, userMentions, '@', userMentionsRegex);
    this.innerHTML = messageHTML;
  }

  createMessageLinks(messageHTML, messageLinks, symbol, regex) {
    if (messageLinks != null) {
      messageHTML = messageHTML.replace(regex, (text) => {
        // cut off starting symbol
        text = text.substr(1);
        const link = '\"/search/' + text + '\"';
        const inner = '<a class=\"' + text + '\"  style=\"cursor: pointer;\">' + symbol + text + '</a>';
        return inner;
      });
    }
    return messageHTML;
  }


  getText(): string {
    return this.text;
  }

  setHashtags() {
    const regex = /(?<=#)[^\s]*(?=$|\s)/g;
    this.hashtags = new Set(this.text.match(regex));
  }

  // starts with #
  getHashtags(): Set<string> {
    return this.hashtags;
  }

  setUserMentions() {
    const regex = /(?<=@)[^\s]*(?=$|\s)/g;
    this.userMentions = new Set(this.text.match(regex));
  }

  // starts with @
  getUserMentions(): Set<string> {
    return this.userMentions;
  }

  getUrls(): Set<string> {
    return this.urls;
  }
}
