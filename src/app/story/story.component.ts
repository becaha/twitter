import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() followUpdate = new EventEmitter();
  private userService: UserService;
  private currentUser: User;
  private viewUser: User;
  private route: ActivatedRoute;
  private isFollowing: boolean;

  constructor(userService: UserService, route: ActivatedRoute) {
    this.userService = userService;
    this.currentUser = userService.getCurrentUser();
    this.route = route;
  }

  /**
   * gets the viewUser from the route parameters by
   * getting the user by handle from the user service
   */
  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.viewUser = this.userService.getUser(paramMap.get('handle'));
      if (this.viewUser == null) {
        this.viewUser = this.userService.getCurrentUser();
      }
      this.setIsFollowing();
    });
  }

  /** returns viewedUser as an array of
   * Users
   */
  getViewUsers() {
    const viewUsers: User[] = [];
    viewUsers.push(this.viewUser);
    return viewUsers;
  }

  loadPic() {

  }

  /** sets isFollowing to whether the current user
   * is following the viewedUser by getting the
   * currentUser's following
   */
  setIsFollowing() {
    if (this.currentUser.getFollowing().includes(this.viewUser)) {
      this.isFollowing = true;
    } else {
      this.isFollowing = false;
    }
  }

  /**
   * currentUser follows the viewedUser
   */
  onFollow() {
    this.currentUser.follow(this.viewUser);
    // reset button
    this.isFollowing = true;
  }

  /**
   * currentUser unfollows the viewedUser
   */
  onUnfollow() {
    this.currentUser.unfollow(this.viewUser);
    // reset button
    this.isFollowing = false;
  }

}
