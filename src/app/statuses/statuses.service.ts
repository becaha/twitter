import { Injectable } from '@angular/core';
import {MOCK_STATUSES} from './mock-statuses';
import {Status} from '../status/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  constructor() { }

  getAllStatuses() {
    // TODO: no mock
    return MOCK_STATUSES;
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
    return this.getAllStatuses().filter((status) => {
      return status.getMessage().getHashtags().has(hashtag);
    });
  }
}
