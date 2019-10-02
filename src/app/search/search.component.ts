import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private userService: UserService;
  private route: ActivatedRoute;
  private searchText: string;

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    console.log(this.userService.getCurrentUser());
    this.route = route;
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.searchText = paramMap.get('text');
      console.log(this.searchText);
    });
  }

}
