import {User} from '../../user/User';
import has = Reflect.has;

export class Message {
  private text: string;
  private hashtags: Set<string>; // no duplicates
  private userMentions: Set<string>;
  private urls: Set<string>;

  constructor(text: string) {
    this.text = text;
    this.setHashtags();
    this.setUserMentions();
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

// constructor(hashtags: Set<string>, userMentions: Set<User>, urls: Set<string>) {
  //   this.hashtags = hashtags;
  //   this.userMentions = userMentions;
  //   this.urls = urls;
  // }
}
