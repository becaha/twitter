import {Attachment} from './attachment/Attachment';
import {Message} from './message/Message';
import {User} from '../user/User';

export class Status {
  private message: Message;
  private attachment: Attachment;
  private owner: User;
  private date: Date;
  private id: string;

  constructor(message: Message, owner?: User, attachment?: Attachment) {
    this.message = message;
    this.owner = owner;
    this.attachment = attachment;
    // date is when it is constructed
    this.date = new Date();
    this.setId();
  }

  public setId() {
    this.id = this.date.getDate().toString() + this.date.getMonth() + this.date.getFullYear() + this.date.getTime();
  }

  public getId() {
    return this.id;
  }

  public getMessage() {
    return this.message;
  }

  public getMessageText() {
    return this.message.getText();
  }

  public getOwner() {
    return this.owner;
  }

  public setOwner(owner: User) {
    this.owner = owner;
    this.id += owner.handle;
  }

  public getDate() {
    return this.date;
  }

  public addAttachment(attachment: Attachment) {
    this.attachment = attachment;
  }

  public getAttachment() {
    return this.attachment;
  }

  // // on posting of the status, time stamp it with the current date
  // public post() {
  //   this.date = new Date();
  // }
}
