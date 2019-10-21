import { Injectable } from '@angular/core';
import {Attachment} from './status/attachment/Attachment';


@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor() { }

  public getUsers() {
  }

  public getUser(handle: string) {

  }

  public updateProfile(handle: string, profile: Attachment) {

  }

  public getProfile(handle: string) {

  }

  public getFollowers(handle: string) {

  }

  public getFollowing(handle: string) {

  }

  public follow(userHandle: string, followHandle: string) {

  }

  public isFollowing(userHandle: string, followHandle: string) {
    //     public followUserHandleFollowHandleGet(followHandle: string, userHandle: string, options: any = {}): Promise<{ response: http.IncomingMessage; body: IsFollowingResponse;  }> {
    followUserHandleFollowHandleGet(followHandle, userHandle);
  }


}
