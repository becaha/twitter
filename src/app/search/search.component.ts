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
  private statuses: Status[];
  private statusesService: StatusesService;

  constructor(userService: UserService, statusesService: StatusesService, route: ActivatedRoute) {
    this.userService = userService;
    console.log(this.userService.getCurrentUser());
    this.route = route;
    this.statusesService = statusesService;
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.searchText = paramMap.get('text');
      console.log(this.searchText);
    });
  }

  // finds all mentions of the searchText and displays stories
  // TODO: more than hashtag
  search(hashtag: string) {
    this.statuses = this.statusesService.getHashtagStatuses(hashtag);
  }

}
