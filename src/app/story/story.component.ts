import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MOCK_USERS} from '../user/mock-users';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  private viewableUser: User;
  private userService: UserService;
  private currentUser: User;
  private viewUser: User;
  private route: ActivatedRoute;
  private users: User[];

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.viewUser = userService.getViewUser();
    console.log('view', this.viewUser);
    this.route = route;
    this.users = MOCK_USERS;
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      // this.viewUser = this.userService.getUser(paramMap.get('handle');
    });
  }

  getUser(handle: string) {
    // let userByHandle = this.users.filter(user => user.handle === handle);
    // return userByHandle[0];
  }

  // returns view user in an array of one object
  getViewUsers() {
    // this.route.params.handle;
    //
    //
    // const viewUsers: User[] = [];
    // viewUsers.push(this.viewUser);
    // return viewUsers;
  }

  loadPic() {

  }

}
