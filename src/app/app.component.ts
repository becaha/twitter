import {Component, Input} from '@angular/core';
import {User} from './user/User';
import {UserService} from './user/user.service';
import {ProxyService} from './proxy.service';
import {Attachment} from './status/attachment/Attachment';
import {Status} from './status/Status';
import {Message} from './status/message/Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TwitterLab';
  private userService: UserService;
  private signup: boolean;
  private currentUser: User;
  private proxy: ProxyService;

  constructor(userService: UserService, proxy: ProxyService) {
    this.userService = userService;
    this.currentUser = this.userService.getCurrentUser();
    console.log(this.currentUser);
    this.proxy = proxy;
    this.test();
  }

  test() {
    console.log('test');
    const user: User = new User('a', 'o', 'Becca', [], [], new Attachment('', ''));
    const status: Status = new Status(new Message('msg'), user);
    this.proxy.getUser(user.handle);
    this.proxy.isFollowing(user.handle, 'friend');
    this.proxy.signupUser(user); //
    this.proxy.follow(user.handle, 'friend');
    this.proxy.getFeed(user.handle);
    this.proxy.getFollowers(user.handle);
    this.proxy.getStory(user.handle);
    this.proxy.getFollowing(user.handle);
    this.proxy.getProfile(user.handle);
    this.proxy.getStatus('a0');
    this.proxy.postStatus(status); //
    this.proxy.unfollow(user.handle, 'friend');
    this.proxy.updateProfile(user.handle, new Attachment('', '')); //
  }

  /**
   * when user logs in, set the current user and
   * the view user as that logged in user
   */
  onLogin(event) {
    this.userService.setCurrentUser(event);
    this.userService.setViewUser(event);
    this.currentUser = event;
  }

  /**
   * logout the current user by setting the users to null
   */
  logout() {
    this.userService.setCurrentUser(null);
    this.userService.setViewUser(null);
    this.currentUser = null;
    this.signup = false;
  }
}
