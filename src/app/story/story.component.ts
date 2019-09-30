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
  private viewableUser: User;
  private userService: UserService;
  private currentUser: User;
  private viewUser: User;

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.viewUser = userService.getViewUser();
    console.log('view', this.viewUser);
  }

  ngOnInit() {
  }

  // returns view user in an array of one object
  getViewUsers() {
    const viewUsers: User[] = [];
    viewUsers.push(this.viewUser);
    return viewUsers;
  }

  loadPic() {

  }

}
