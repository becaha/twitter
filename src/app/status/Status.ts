import {Attachment} from './attachment/Attachment';
import {Message} from './message/Message';

export class Status {
  private message: Message;
  private ownerHandle: string;
  private profile: Attachment;
  private attachment: Attachment;
  private date: string;
  private id: string;

  constructor(message: Message, ownerHandle: string, profile: Attachment, attachment?: Attachment, date?: string, id?: string) {
    this.message = message;
    this.ownerHandle = ownerHandle;
    this.profile = profile;
    this.attachment = attachment;
    // date is when it is constructed
    this.date = date;
    this.setDate();
    this.id = id;
    this.setId();
  }


  getProfile(): Attachment {
    return this.profile;
  }

  setProfile(value: Attachment) {
    this.profile = value;
  }

  public setDate() {
    if (this.date == null) {
      const date = new Date();
      this.date = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
  }

  public setId() {
    if (this.id == null) {
      this.id = this.date;
    }
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

  public getOwnerHandle() {
    return this.ownerHandle;
  }

  public setOwnerHandle(ownerHandle: string) {
    this.ownerHandle = ownerHandle;
    this.id += ownerHandle;
  }

  public getDate() {
    return this.date;
  }

  public setAttachment(attachment: Attachment) {
    this.attachment = attachment;
  }

  public getAttachment() {
    return this.attachment;
  }
}
