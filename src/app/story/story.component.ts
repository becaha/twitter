import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  // @Input() viewableUser: User;
  private viewableUser: User;
  private userService: UserService;
  private currentUser: User;
  private viewUser: User; // don't need
  private route: ActivatedRoute;

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.viewUser = userService.getViewUser();
    this.route = route;
    this.route.params.subscribe(params => {
      console.log(params);
      this.viewableUser = params.viewableUser;
    });
  }

  ngOnInit() {
  }

  // returns view user in an array of one object
  getViewUsers() {
    const viewUsers: User[] = [];
    viewUsers.push(this.viewableUser);
    return viewUsers;
  }

  loadPic() {

  }

}
