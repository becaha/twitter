import {Attachment} from '../status/attachment/Attachment';

export class User {

  handle: string;
  password: string;
  name: string;
  profile: Attachment; // url image

  constructor(handle: string, password: string, name: string, profile: Attachment) {
    this.handle = handle;
    this.password = password;
    this.name = name;
    this.profile = profile;
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

  public getProfile() {
    return this.profile;
  }

  public getAttachmentSrc() {
    return this.profile.getSrc();
  }
}
