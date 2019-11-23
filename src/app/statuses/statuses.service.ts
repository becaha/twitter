import { Injectable } from '@angular/core';
import {Status} from '../status/Status';
import {ProxyService} from '../proxy.service';
import {User} from '../user/User';
import {Message} from '../status/message/Message';
import {Attachment} from '../status/attachment/Attachment';
import {FeedResponse} from './FeedResponse';
import {StoryResponse} from './StoryResponse';
import {HashtagResponse} from './HashtagResponse';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  private proxy: ProxyService;
  private userService: UserService;

  constructor(proxy: ProxyService, userService: UserService) {
    this.proxy = proxy;
    this.userService = userService;
  }

  addStatus(status: Status) {
    const auth = this.userService.getAuth();
    this.proxy.postStatus(status, auth);
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


  public async getFeed(user: User, lastHandle?: string, lastTimestamp?: string) {
    const response = await this.proxy.getFeed(user.handle, lastHandle, lastTimestamp);
    const statuses = this.extractStatuses(response);
    const nextHandle = response.lastHandle;
    const nextTimestamp = response.lastTimestamp;
    console.log(response, response.lastHandle);
    return new FeedResponse(statuses, nextHandle, nextTimestamp);
  }

  public async getStory(user: User, lastOwnerHandle?: string, lastId?: string) {
    const response = await this.proxy.getStory(user.handle, lastOwnerHandle, lastId);
    const statuses = this.extractStatuses(response);
    const nextOwnerHandle = response.ownerHandle;
    const nextId = response.id;
    return new StoryResponse(statuses, nextOwnerHandle, nextId);
  }

  // returns all statuses with given hashtag
  async getHashtagStatuses(hashtag: string, lastHashtag?: string, lastTimestamp?: string) {
    const response = await this.proxy.getHashtagStatuses(hashtag, lastHashtag, lastTimestamp);
    const statuses = this.extractStatuses(response);
    const nextHashtag = response.lastHashtag;
    const nextTimestamp = response.lastTimestamp;
    return new HashtagResponse(statuses, nextHashtag, nextTimestamp);
  }

  isBlankStatus(status) {
    return status.id === '' && status.ownerHandle === '';
  }

  extractStatuses(response) {
    const statuses: Status[] = [];
    response.statuses.forEach((value, index, array) => {
        if (!this.isBlankStatus(value)) {
          statuses.push(new Status(new Message(value.message), value.ownerHandle,
            new Attachment(value.attachmentSrc), value.date, value.id));
        }
      }
    );
    return statuses;
  }
}
