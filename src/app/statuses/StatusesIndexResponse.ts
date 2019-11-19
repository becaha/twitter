import {Status} from '../status/Status';

export class StatusesIndexResponse {

  statuses: Status[];
  startIndex: string;

  constructor(statuses: Status[], startIndex: string) {
    this.statuses = statuses;
    this.startIndex = startIndex;
  }

  getStatuses() {
    return this.statuses;
  }

  getStartIndex() {
    return this.startIndex;
  }
}
