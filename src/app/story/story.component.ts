import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FollowService} from '../follow/follow.service';
import {Status} from '../status/Status';

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
  private viewUserHandle: string;
  private route: ActivatedRoute;
  private isFollowing: boolean;
  private gotIsFollowing = false;
  private followService: FollowService;
  private statuses: Status[] = [];

  constructor(userService: UserService, followService: FollowService, route: ActivatedRoute) {
    this.userService = userService;
    this.followService = followService;
    this.currentUser = userService.getCurrentUser();
    this.route = route;
  }

  /**
   * gets the viewUser from the route parameters by
   * getting the user by handle from the user service
   */
  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.viewUserHandle = paramMap.get('handle');
      this.getViewUser();
    });
  }

  @HostListener('window:scroll', [])
  async onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      // bottom of the page
      console.log('scrolled to bottom');
      const statuses = await this.userService.getStory(this.viewUser);
      this.statuses = this.statuses.concat(statuses);
    }
  }

  async getViewUser() {
    this.viewUser = await this.userService.getUser(this.viewUserHandle);
    console.log('story get view user', this.viewUser, this.currentUser);
    if (this.viewUser == null) {
      this.viewUser = this.userService.getCurrentUser();
      console.log('got user is null so set to ' + this.viewUser);
    }
    // this.setIsFollowing();
    this.getStory();
    this.setIsFollowing();
  }

  async getStory() {
    this.statuses = await this.userService.getStory(this.viewUser);
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
  async setIsFollowing() {
    // if (this.currentUser.getFollowing().includes(this.viewUser)) {
    //   this.isFollowing = true;
    // } else {
    //   this.isFollowing = false;
    // }
    this.isFollowing = await this.followService.isFollowing(this.currentUser, this.viewUser);
    this.gotIsFollowing = true;
  }

  /**
   * currentUser follows the viewedUser
   */
  onFollow() {
    console.log(this.currentUser, this.viewUser);
    this.followService.follow(this.currentUser, this.viewUser);
    // reset button
    this.isFollowing = true;
  }

  /**
   * currentUser unfollows the viewedUser
   */
  onUnfollow() {
    this.followService.unfollow(this.currentUser, this.viewUser);
    // reset button
    this.isFollowing = false;
  }

}
