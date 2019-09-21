import {Attachment} from './Attachment/Attachment';
import {Message} from './Message/Message';

export class Status {
  private message: Message;
  private attachment?: Attachment;

  constructor(message: Message) {
    this.message = message;
  }

  // constructor(message: Message, attachment: Attachment) {
  //   this.message = message;
  //   this.attachment = attachment;
  // }

  public getMessageText() {
    return this.message.getText();
  }
}
