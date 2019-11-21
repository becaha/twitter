import {Status} from '../status/Status';

export class HashtagResponse {

  statuses: Status[];
  lastHashtag: string;
  lastTimestamp: string;

  constructor(statuses: Status[], lastHashtag: string, lastTimestamp: string) {
    this.statuses = statuses;
    this.lastHashtag = lastHashtag;
    this.lastTimestamp = lastTimestamp;
  }

  getStatuses() {
    return this.statuses;
  }

  getLastHashtag() {
    return this.lastHashtag;
  }

  getLastTimestamp() {
    return this.lastTimestamp;
  }
}
