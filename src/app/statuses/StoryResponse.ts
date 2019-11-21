import {Status} from '../status/Status';

export class StoryResponse {

  statuses: Status[];
  ownerHandle: string;
  id: string;

  constructor(statuses: Status[], ownerHandle: string, id: string) {
    this.statuses = statuses;
    this.ownerHandle = ownerHandle;
    this.id = id;
  }

  getStatuses() {
    return this.statuses;
  }

  getOwnerHandle() {
    return this.ownerHandle;
  }

  getId() {
    return this.id;
  }
}
