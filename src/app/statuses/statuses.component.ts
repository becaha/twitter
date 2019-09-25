import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../status/Status';
import {User} from '../user/User';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {
  @Input() owners: User[];
  private statuses: Status[] = [];

  constructor() {
  }

  ngOnInit() {
    this.setStatuses();
  }

  public setStatuses() {
    console.log(this.owners);
    const stories = this.owners.map(f => f.getStory());
    for (const story of stories) {
      console.log(story);
      this.statuses = this.statuses.concat(story);
    }
    console.log('statuses', this.statuses);
  }

  public getStatuses() {
    return this.statuses;
  }
}
