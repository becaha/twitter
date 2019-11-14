import { Injectable } from '@angular/core';
import {Status} from '../status/Status';
import {ProxyService} from '../proxy.service';

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

  // returns all statuses with given hashtag
  async getHashtagStatuses(hashtag: string) {
    return await this.proxy.getHashtagStatuses(hashtag);
  }
}
