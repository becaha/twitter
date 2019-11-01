import { Component, OnInit } from '@angular/core';
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
  private foundStatuses: Status[];

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
      this.search(this.searchText);
    });
  }

  /**
   *  finds all mentions of the searchText and displays statuses
   *  that mention it
   *  TODO: can search, and for more than hashtags
   */
  async search(hashtag: string) {
    this.foundStatuses = await this.statusesService.getHashtagStatuses(hashtag);
    console.log('found statuses', this.foundStatuses);
  }

}
