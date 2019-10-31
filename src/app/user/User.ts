import {Attachment} from '../status/attachment/Attachment';
import {Status} from '../status/Status';

export class User {

  handle: string;
  password: string;
  name: string;
  profile: Attachment; // url image

  followers: User[] = [];
  following: User[] = [];
  story: Status[] = [];

  constructor(handle: string, password: string, name: string, profile: Attachment)
  constructor(handle: string, password: string, name: string, profile: Attachment, followers?: User[], following?: User[]) {
    this.handle = handle;
    this.password = password;
    this.name = name;
    this.profile = profile;
    this.followers = followers;
    this.following = following;
  }

  public getHandle() {
    return this.handle;
  }

  public getName() {
    return this.name;
  }

  public getPassword() {
    return this.password;
  }

  public getFollowers() {
    return this.followers;
  }

  public getFollowing() {
    return this.following;
  }

  public getProfile() {
    return this.profile;
  }

  public getStory() {
    return this.story;
  }

  public getAttachmentSrc() {
    return this.profile.getSrc();
  }
}
