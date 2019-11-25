import { Injectable } from '@angular/core';
import {UserService} from './user/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userService: UserService;
  private router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  async checkAuthorized(handle, response) {
    if (response.success === 'false') {
      console.log('not authorized, logging out');
      window.alert('Unauthorized (could be caused by a timeout), Logging out');
      await this.userService.logout(handle);
    }
  }
}
