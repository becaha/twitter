import {Attachment} from '../status/Attachment/Attachment';
import {Status} from '../status/Status';

export class User {

  handle: string;
  password: string;
  name: string;
  followers?: User[] = [];
  following?: User[] = [];
  profile: Attachment; // url image
  story: Status[] = [];

  // constructor(handle: string, password: string) {
  //   this.handle = handle;
  //   this.password = password;
  // }

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

  // not called by UI!!
  // someone (called a follower) follows the user
  // add follower to user
  public addFollower(follower: User) {
    this.followers.push(follower);
  }

  // user unfollows another user (called a following)
  public removeFollowing(following: User) {
    this.following.filter(f => f.handle !== following.handle);
  }

  // user follows another user (called a following)
  // add following to user and add user follow to following
  public addFollowing(following: User) {
    this.following.push(following);
    following.addFollower(this);
  }

  // TODO what type???
  public setProfile(profile: any) {
    this.profile = profile;
  }

  public addStatus(status: Status) {
    this.story.push(status);
  }
}
