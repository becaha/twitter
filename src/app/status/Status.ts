import {Attachment} from './Attachment/Attachment';
import {Message} from './Message/Message';
import {User} from '../user/User';

export class Status {
  private message: Message;
  private attachment?: Attachment;
  private owner: User;
  private date: Date;

  constructor(message: Message, owner?: User, attachment?: Attachment) {
    this.message = message;
    this.owner = owner;
    this.attachment = attachment;
    // date is when it is constructed
    this.date = new Date();
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
  }

  public getDate() {
    return this.date;
  }

  // // on posting of the status, time stamp it with the current date
  // public post() {
  //   this.date = new Date();
  // }
}
