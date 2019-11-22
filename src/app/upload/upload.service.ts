import { Injectable } from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {ProxyService} from '../proxy.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private userService: UserService;
  private proxy: ProxyService;
  private profile: string;

  constructor(userService: UserService, proxy: ProxyService) {
    this.userService = userService;
    this.proxy = proxy;
  }

  getProfile() {
    return this.profile;
  }

  /**
   * when user uploads a file
   * @param event
   */
  async onFileUpload(event) {
    console.log('on file upload');
    if (event.target.files.length > 0) {
      const fileReader = new FileReader();
      const imageToUpload = event.target.files.item(0);
      this.imageToBase64(fileReader, imageToUpload)
        .subscribe(base64image => {
          // console.log('base64 image', base64image);
          this.profile = base64image;
          this.updateUserProfile();
        });
    }
  }

  async updateUserProfile() {
    if (this.userService.getCurrentUser()) {
      const auth = this.userService.getAuth();
      console.log('auth', auth);
      return await this.proxy.updateProfile(this.userService.getCurrentUser().getHandle(), this.profile, auth);
    }
  }

  async newUserProfile(handle: string) {
    const auth = this.userService.getAuth();
    console.log('auth', auth);
    return await this.proxy.updateProfile(handle, this.profile, auth);
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }
}
