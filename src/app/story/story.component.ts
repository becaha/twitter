import {ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {ActivatedRoute} from '@angular/router';
import {FollowService} from '../follow/follow.service';
import {Status} from '../status/Status';
import {StatusesService} from '../statuses/statuses.service';

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
  private statusesService: StatusesService;
  private statuses: Status[] = [];
  private lastOwnerHandle: string = null;
  private lastId: string = null;
  private noMore = false;
  private awaiting = false;
  private changer: ChangeDetectorRef;
  private src: string;

  constructor(userService: UserService, statusesService: StatusesService, followService: FollowService, route: ActivatedRoute, changer: ChangeDetectorRef) {
    this.userService = userService;
    this.statusesService = statusesService;
    this.followService = followService;
    this.currentUser = userService.getCurrentUser();
    this.route = route;
    this.changer = changer;
  }

  /**
   * gets the viewUser from the route parameters by
   * getting the user by handle from the user service
   */
  ngOnInit() {
    console.log('story');
    // this.src = null;
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe( paramMap => {
      this.viewUserHandle = paramMap.get('handle');
      this.src = 'https://cs340-profile-bucket.s3-us-east-2.amazonaws.com/' + this.viewUserHandle + '?time=' + new Date().getTime();
      // this.changer.detectChanges();
      this.getViewUser();
    });
  }

  @HostListener('window:scroll', [])
  async onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - .5) {
      // bottom of the page
      console.log('scrolled to bottom');
      if (this.noMore || this.awaiting) {
        return [];
      }
      this.awaiting = true;
      const statusesResponse = await this.statusesService.getStory(this.viewUser, this.lastOwnerHandle, this.lastId);
      this.statuses = this.statuses.concat(statusesResponse.statuses);
      this.lastOwnerHandle = statusesResponse.getOwnerHandle();
      this.lastId = statusesResponse.getId();
      this.awaiting = false;
      if (this.lastOwnerHandle === '' && this.lastId === '') {
        this.noMore = true;
      } else {
        this.noMore = false;
      }
    }
  }

  async getViewUser() {
    this.lastOwnerHandle = null;
    this.lastId = null;
    this.noMore = false;
    this.awaiting = false;
    console.log('story get view user', this.viewUserHandle, this.currentUser);
    this.viewUser = await this.userService.getUser(this.viewUserHandle);
    if (this.viewUser == null) {
      this.viewUser = this.userService.getCurrentUser();
      console.log('got user is null so set to ' + this.viewUser);
    }
    await this.getStory();
    this.setIsFollowing();
  }

  async getStory() {
    if (this.noMore || this.awaiting) {
      return [];
    }
    this.awaiting = true;
    const statusesResponse = await this.statusesService.getStory(this.viewUser, this.lastOwnerHandle, this.lastId);
    this.statuses = statusesResponse.statuses;
    console.log('get story', this.statuses);
    this.lastOwnerHandle = statusesResponse.getOwnerHandle();
    this.lastId = statusesResponse.getId();
    this.awaiting = false;
    if (this.lastOwnerHandle === '' && this.lastId === '') {
      this.noMore = true;
    } else {
      this.noMore = false;
    }
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
