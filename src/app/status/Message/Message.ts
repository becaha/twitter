import {User} from '../../user/User';

export class Message {
  private text: string;
  private hashtags: Set<string>;
  private userMentions: Set<User>;
  private urls: Set<string>;

  constructor(text: string) {
    this.text = text;
  }


  getText(): string {
    return this.text;
  }

  // starts with #
  getHashtags(): Set<string> {
    const regex = '#[^\s]*(?=$|\s)';
    const hashtags = this.text.match(regex);
    console.log(hashtags);
    return this.hashtags;
  }

  // starts with @
  getUserMentions(): Set<User> {
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
