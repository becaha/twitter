import { Injectable } from '@angular/core';
import {Status} from '../status/Status';
import {ProxyService} from '../proxy.service';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  private mockAllStatuses: Status[] = [];
  private proxy: ProxyService;

  constructor(proxy: ProxyService) {
    this.proxy = proxy;
  }

  addStatus(status: Status) {
    // TODO: not mock
    this.mockAllStatuses.push(status); // TODO: 3
    this.proxy.postStatus(status);
  }

  getStatus(id: string) {
    // const statuses = this.getAllStatuses().filter((status) => {
    //   return status.getId() === id;
    // });
    // return statuses[0];
    return this.proxy.getStatus(id);
  }

  getAllStatuses() {
    // TODO: no mock
    return this.mockAllStatuses;
  }

  /**
   * orders statuses from oldest to newest
   * so when it prints out the cards, the oldest will be first
   * and it will be at the bottom
   */
  public orderStatuses(statuses: Status[]) {
    const orderedStatuses = statuses.sort((a, b) => {
      if (a.getDate().getTime() < b.getDate().getTime()) {
        return 1;
      } else if (a.getDate().getTime() === b.getDate().getTime()) {
        return 0;
      }
      return -1;
    });
    return orderedStatuses;
  }

  // returns all statuses with given hashtag
  getHashtagStatuses(hashtag: string) {
    const hashtagStatuses =  this.getAllStatuses().filter((status) => {
      return status.getMessage().getHashtags().has(hashtag);
    });
    return this.orderStatuses(hashtagStatuses);
  }
}
