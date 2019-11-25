import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Status} from '../status/Status';
import {StatusesService} from '../statuses/statuses.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private userService: UserService;
  private route: ActivatedRoute;
  private searchText: string;
  private statusesService: StatusesService;
  private foundStatuses: Status[] = [];
  private lastHashtag;
  private lastTimestamp;
  private noMore = false;
  private awaiting = false;

  constructor(userService: UserService, statusesService: StatusesService, route: ActivatedRoute) {
    this.userService = userService;
    this.route = route;
    this.statusesService = statusesService;
  }

  /**
   * gets the search text from the route parameters
   */
  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.searchText = paramMap.get('text');
      this.noMore = false;
      this.awaiting = false;
      this.lastTimestamp = null;
      this.lastHashtag = null;
      window.scrollTo(0, 0);
      this.search();
    });
  }

  @HostListener('window:scroll', [])
  async onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - .5) {
      // bottom of the page
      const statuses = await this.getHashtagStatuses();
      this.foundStatuses = this.foundStatuses.concat(statuses);
    }
  }

  /**
   *  finds all mentions of the searchText and displays statuses
   *  that mention it
   *  TODO: can search, and for more than hashtags
   */
  async search() {
    this.foundStatuses = await this.getHashtagStatuses();
    // console.log('found statuses', this.foundStatuses);
  }

  async getHashtagStatuses() {
    if (this.noMore || this.awaiting) {
      return [];
    }
    this.awaiting = true;
    const statusesResponse = await this.statusesService.getHashtagStatuses(this.searchText, this.lastHashtag, this.lastTimestamp);
    console.log(statusesResponse);
    const statuses = statusesResponse.statuses;
    this.lastHashtag = statusesResponse.lastHashtag;
    this.lastTimestamp = statusesResponse.lastTimestamp;
    this.awaiting = false;
    if (!this.lastHashtag && !this.lastTimestamp) {
      this.noMore = true;
    } else {
      this.noMore = false;
    }
    return statuses;
  }

}
