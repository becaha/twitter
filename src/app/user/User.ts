import {Attachment} from '../status/attachment/Attachment';
import {Status} from '../status/Status';

export class User {

  handle: string;
  password: string;
  name: string;
  followers: User[] = [];
  following: User[] = [];
  profile: Attachment; // url image
  story: Status[] = [];

  constructor(handle: string, password: string, name: string, followers: User[], following: User[], profile: Attachment) {
    this.handle = handle;
    this.password = password;
    this.name = name;
    this.followers = followers;
    this.following = following;
    this.profile = profile;
  }

  public getHandle() {
    return this.handle;
  }

  public getName() {
    return this.name;
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

  public addProfile(src: string) {
    this.profile = new Attachment(src);
  }

  // not called by UI!!
  // someone (called a follower) follows the user
  // add follower to user
  public addFollower(follower: User) {
    this.followers.push(follower);
  }

  // user unfollows another user (called a following)
  // user is removed from that other user's followers
  public unfollow(following: User) {
    this.following = this.following.filter(f => f.handle !== following.handle);
    following.followers = following.getFollowers().filter(f => f.handle !== this.handle);
  }

  // user follows another user (called a following)
  // add following to user and add user follow to following
  public follow(following: User) {
    this.following.push(following);
    following.addFollower(this);
  }

  // TODO what type???
  public setProfile(profile: any) {
    this.profile = profile;
  }

  public addStatus(status: Status) {
    this.story.push(status);
    status.setOwner(this);
    return status;
  }
}
