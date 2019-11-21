import {Status} from '../status/Status';

export class FeedResponse {

  statuses: Status[];
  lastHandle: string;
  lastTimestamp: string;

  constructor(statuses: Status[], lastHandle: string, lastTimestamp: string) {
    this.statuses = statuses;
    this.lastHandle = lastHandle;
    this.lastTimestamp = lastTimestamp;
  }

  getStatuses() {
    return this.statuses;
  }

  getLastHandle() {
    return this.lastHandle;
  }

  getLastTimestamp() {
    return this.lastTimestamp;
  }
}
