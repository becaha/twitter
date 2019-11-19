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
  private startIndex = '0';
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
      this.search();
    });
  }

  @HostListener('window:scroll', [])
  async onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - .5) {
      // bottom of the page
      console.log('scrolled to bottom', this.searchText);
      if (this.noMore || this.awaiting) {
      return [];
    }
      this.awaiting = true;
      const statusesResponse = await this.statusesService.getHashtagStatuses(this.searchText, this.startIndex);
      console.log(statusesResponse);
      this.foundStatuses = this.foundStatuses.concat(statusesResponse.statuses);
      this.startIndex = statusesResponse.startIndex;
      this.awaiting = false;
      if (this.startIndex === '-1') {
        this.noMore = true;
      } else {
        this.noMore = false;
      }
    }
  }

  /**
   *  finds all mentions of the searchText and displays statuses
   *  that mention it
   *  TODO: can search, and for more than hashtags
   */
  async search() {
    if (this.noMore || this.awaiting) {
      return [];
    }
    this.awaiting = true;
    const statusesResponse = await this.statusesService.getHashtagStatuses(this.searchText, this.startIndex);
    console.log(statusesResponse);
    this.foundStatuses = statusesResponse.statuses;
    this.startIndex = statusesResponse.startIndex;
    this.awaiting = false;
    if (this.startIndex === '-1') {
      this.noMore = true;
    } else {
      this.noMore = false;
    }
    console.log('found statuses', this.foundStatuses);
  }

}
