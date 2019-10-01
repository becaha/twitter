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
  private userService: UserService;
  private currentUser: User;
  private viewUser: User;
  private route: ActivatedRoute;
  private users: User[];
  private isFollowing: boolean;

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.route = route;
    this.users = MOCK_USERS;
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.viewUser = this.userService.getUser(paramMap.get('handle'));
      if (this.viewUser == null) {
        this.viewUser = this.userService.getCurrentUser();
      }
      this.setIsFollowing();
    });
  }

  // returns view user in an array of one object
  getViewUsers() {
    const viewUsers: User[] = [];
    viewUsers.push(this.viewUser);
    return viewUsers;
  }

  loadPic() {

  }

  setIsFollowing() {
    if (this.currentUser.getFollowing().includes(this.viewUser)) {
      this.isFollowing = true;
    } else {
      this.isFollowing = false;
    }
  }

  onFollow() {
    this.currentUser.follow(this.viewUser);
    // reset button
    this.isFollowing = true;
  }

  onUnfollow() {
    this.currentUser.unfollow(this.viewUser);
    // reset button
    this.isFollowing = false;
  }

}
