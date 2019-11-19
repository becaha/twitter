import { Injectable } from '@angular/core';
import {Status} from '../status/Status';
import {ProxyService} from '../proxy.service';
import {User} from '../user/User';
import {Message} from '../status/message/Message';
import {Attachment} from '../status/attachment/Attachment';
import {StatusesIndexResponse} from './StatusesIndexResponse';
import {StatusesLastResponse} from './StatusesLastResponse';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  private proxy: ProxyService;

  constructor(proxy: ProxyService) {
    this.proxy = proxy;
  }

  addStatus(status: Status) {
    this.proxy.postStatus(status);
  }

  async getStatus(id: string) {
    return await this.proxy.getStatus(id);
  }

  /**
   * orders statuses from oldest to newest
   * so when it prints out the cards, the oldest will be first
   * and it will be at the bottom
   */
  public orderStatuses(statuses: Status[]) {
    // TODO: order statuses in backend
    // const orderedStatuses = statuses.sort((a, b) => {
    //   if (a.getDate().getTime() < b.getDate().getTime()) {
    //     return 1;
    //   } else if (a.getDate().getTime() === b.getDate().getTime()) {
    //     return 0;
    //   }
    //   return -1;
    // });
    // return orderedStatuses;
    return statuses;
  }


  public async getFeed(user: User, startIndex?: string) {
    const response = await this.proxy.getFeed(user.handle, startIndex);
    const statuses = this.extractStatuses(response);
    const nextIndex = response.startIndex;
    console.log(response, response.startIndex);
    return new StatusesIndexResponse(statuses, nextIndex);
  }

  public async getStory(user: User, lastOwnerHandle?: string, lastId?: string) {
    const response = await this.proxy.getStory(user.handle, lastOwnerHandle, lastId);
    const statuses = this.extractStatuses(response);
    const nextOwnerHandle = response.ownerHandle;
    const nextId = response.id;
    return new StatusesLastResponse(statuses, nextOwnerHandle, nextId);
  }

  // returns all statuses with given hashtag
  async getHashtagStatuses(hashtag: string, startIndex?: string) {
    const response = await this.proxy.getHashtagStatuses(hashtag, startIndex);
    const statuses = this.extractStatuses(response);
    const nextIndex = response.startIndex;
    return new StatusesIndexResponse(statuses, nextIndex);
  }

  extractStatuses(response) {
    const statuses: Status[] = [];
    response.statuses.forEach((value, index, array) => {
        statuses.push(new Status(new Message(value.message), value.ownerHandle,
          new Attachment(value.attachmentSrc, ''), value.date, value.id));
      }
    );
    return statuses;
  }
}
