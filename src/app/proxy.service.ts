import { Injectable } from '@angular/core';
import {Attachment} from './status/attachment/Attachment';
import {
  DefaultService,
  IsFollowingResponse,
  UserResponse,
  Response,
  SignupRequest,
  UsersResponse,
  StatusResponse,
  StoryStatusesResponse,
  FeedStatusesResponse,
  HashtagStatusesResponse,
  FollowRequest, LoginRequest
} from '../../api';
import {UpdateProfileRequest} from '../../api/model/updateProfileRequest';
import {Status} from './status/Status';
import {PostStatusRequest} from '../../api/model/postStatusRequest';
import {User} from './user/User';
import {Message} from './status/message/Message';


@Injectable({
  providedIn: 'root'
})

// after update and re-downloading of the yaml
// java -jar swagger-codegen-cli.jar generate -i twitter-api-prod-swagger.yaml -l typescript-angular -o C:\Users\becab\IdeaProjects\TwitterLab\api --additional-properties supportsES6=true
// then go into the DefaultService and replace the errors with strings


export class ProxyService {
  private apiGateway: DefaultService;
  private followsPageSize = '3';
  private statusesPageSize = '4';

  constructor(apiGateway: DefaultService) {
    this.apiGateway = apiGateway;
  }

  async getUser(handle: string) {
    const response: UserResponse = await this.apiGateway.usersHandleGet(handle).toPromise();
    console.log('getUser', response);
    if (response !== null) {
      console.log('getUser', response.handle, response.name);
      return new User(response.handle, response.name);
    }
    return null;
  }

  async signupUser(handle: string, password: string, name: string) {
    const request: SignupRequest = {
      handle,
      password,
      name
    };
    const response: UserResponse = await this.apiGateway.usersHandleSignupPost(handle, request).toPromise();
    console.log('signup', response.authorization);
    return response;
  }

  async loginUser(handle: string, password: string) {
    const req: LoginRequest = {
      handle,
      password
    };
    const response: UserResponse = await this.apiGateway.usersHandleLoginPost(handle, req).toPromise();
    console.log('login', response.authorization);
    return response;
  }

  async logoutUser(handle: string) {
    const response: Response = await this.apiGateway.usersHandleLogoutPost(handle).toPromise();
    return response;
  }

  async getStory(handle: string, ownerHandle?: string, id?: string) {
    const response: StoryStatusesResponse = await this.apiGateway.usersHandleStoryGet
      (this.statusesPageSize, handle, ownerHandle, id).toPromise();
    console.log('get story', response);
    return response;
  }

  async getFeed(handle: string, lastHandle?: string, lastTimestamp?: string) {
    console.log('get feed');
    const response: FeedStatusesResponse = await this.apiGateway.usersHandleFeedGet
      (this.statusesPageSize, handle, lastHandle, lastTimestamp).toPromise();
    console.log('get feed statuses', response.statuses);
    return response;
  }

  async updateProfile(handle: string, profile: string, auth: string) {
    console.log('update prof', handle, auth);
    // profile is base64 encoded image
    const req: UpdateProfileRequest = {
      handle,
      src: profile,
      authorization: auth
    };
    const response: Response = await this.apiGateway.usersHandleProfilePost(handle, req).toPromise();
    console.log('update prof', response);
    return response;
  }

  async getFollowers(handle: string, userHandle?: string, followHandle?: string) {
    const response: UsersResponse = await this.apiGateway.usersHandleFollowersGet(
          this.followsPageSize, handle, userHandle, followHandle).toPromise();
    console.log('get followers', response);
    return response;
  }

  async getFollowing(handle: string, userHandle?: string, followHandle?: string) {
    const response: UsersResponse = await this.apiGateway.usersHandleFollowingGet(
      this.followsPageSize, handle, userHandle, followHandle).toPromise();
    console.log('get following', response);
    return response;
  }

  async getStatus(statusId: string) {
    const response: StatusResponse = await this.apiGateway.statusesStatusStatusIdGet(statusId).toPromise();
    console.log(response);
    console.log('get status', response.id, response.message, response.date, response.ownerHandle, response.attachmentSrc);
    return new Status(new Message(response.message), response.ownerHandle,
                      new Attachment(response.attachmentSrc), response.date, response.id);
  }

  async postStatus(status: Status, auth: string) {
    let src;
    if (status.getAttachment() !== undefined) {
      src = status.getAttachment().getSrc();
    }
    console.log('src', src);
    if (src === '' || !src) {
      src = 'None';
    }
    const req: PostStatusRequest = {
      message: status.getMessageText(),
      attachmentSrc: src,
      ownerHandle: status.getOwnerHandle(),
      authorization: auth
    };
    const response: Response = await this.apiGateway.statusesPostPost(req).toPromise();
    console.log('post', response);
  }

  async follow(userHandle: string, followHandle: string, auth: string) {
    const req: FollowRequest = {
      userHandle,
      followHandle,
      authorization: auth
    };
    const response: Response = await this.apiGateway.followUserHandleFollowHandlePost(followHandle, userHandle, req).toPromise();
    console.log('follow', response.message);
  }

  async unfollow(userHandle: string, followHandle: string, auth: string) {
    const req: FollowRequest = {
      userHandle,
      followHandle,
      authorization: auth
    };
    const response: Response = await this.apiGateway.followUserHandleFollowHandleUnfollowPost(followHandle, userHandle, req).toPromise();
    console.log('unfollow', response.message);
  }

  async isFollowing(userHandle: string, followHandle: string) {
    const response: IsFollowingResponse = await this.apiGateway.followUserHandleFollowHandleGet(followHandle, userHandle).toPromise();
    const isFollowingBool: boolean = JSON.parse(response.isFollowing);
    console.log(userHandle, ' is following ', followHandle, ' ', isFollowingBool);
    return isFollowingBool;
  }

  async getHashtagStatuses(hashtag: string, lastHashtag?: string, lastTimestamp?: string) {
    console.log('get hash', this.statusesPageSize, lastHashtag, hashtag);
    const response: HashtagStatusesResponse = await this.apiGateway.statusesHashtagHashtagGet
      (this.statusesPageSize, hashtag, lastHashtag, lastTimestamp).toPromise();
    console.log(response);
    return response;
  }


}
