import { Injectable } from '@angular/core';
import {Attachment} from './status/attachment/Attachment';
import {DefaultApi} from '../../projects/twitter-swagger-client/src/api';


@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  private apiGateway: DefaultApi;

  constructor(apiGateway: DefaultApi) {
    this.apiGateway = apiGateway;
  }

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
    /*
         public followUserHandleFollowHandleGet(followHandle: string,
         userHandle: string, options: any = {}):
         Promise<{ response: http.IncomingMessage; body: IsFollowingResponse;  }> {
    */
    this.apiGateway.followUserHandleFollowHandleGet(followHandle, userHandle).then((res) => {
      console.log('isFollowing api call');
    });
  }


}
