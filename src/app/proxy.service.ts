import { Injectable } from '@angular/core';
import {Attachment} from './status/attachment/Attachment';
import {
  DefaultService,
  IsFollowingResponse,
  ProfileResponse,
  UserResponse,
  Response,
  StatusesIndexResponse, SignupRequest, UsersResponse, AuthResponse, StatusesLastResponse, StatusResponse
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
  private pageSize = '1';

  constructor(apiGateway: DefaultService) {
    this.apiGateway = apiGateway;
  }

  async getUser(handle: string) {
    const response: UserResponse = await this.apiGateway.usersHandleGet(handle).toPromise();
    console.log('getUser', response);
    if (response !== null) {
      console.log('getUser', response.handle, response.name, response.password);
      return new User(response.handle, response.password, response.name);
    }
    return null;
  }

  async signupUser(handle: string, password: string, name: string) {
    // user.getHandle(), user.getPassword(), user.getName()
    const request: SignupRequest = {
      handle,
      password,
      name
    };
    const response: Response = await this.apiGateway.usersHandleSignupPost(handle, request).toPromise();
    console.log('signup', response.message);
    // TODO: change this
    return new User(handle, password, name);
  }

  // TODO: real auth login
  async loginUser(handle: string, password: string) {
    // const req: LoginRequest;
    const response: AuthResponse = await this.apiGateway.usersHandleLoginGet(handle).toPromise();
  }

  // TODO: real auth logout
  async logoutUser(handle: string) {
    const response: Response = await this.apiGateway.usersHandleLogoutPost(handle).toPromise();
  }

  async getStory(handle: string, ownerHandle ?: string, id?: string) {
    const response: StatusesLastResponse = await this.apiGateway.usersHandleStoryGet(this.pageSize, handle, ownerHandle, id).toPromise();
    console.log('get story', response);
    return response;
  }

  async getFeed(handle: string, startIndex?: string) {
    console.log('get feed', startIndex);
    const response: StatusesIndexResponse = await this.apiGateway.usersHandleFeedGet(this.pageSize, handle, startIndex).toPromise();
    console.log('get feed', response);
    return response;
  }

  async updateProfile(handle: string, profile: string) {
    // profile is base64 encoded image
    const req: UpdateProfileRequest = {
      handle,
      src: profile
    };
    const response: Response = await this.apiGateway.usersHandleProfilePost(handle, req).toPromise();
    console.log('update prof', response.message);
    return response;
  }

  async getProfile(handle: string) {
    const response: ProfileResponse = await this.apiGateway.usersHandleProfileGet(handle).toPromise();
    console.log('get prof', response.src);
    return response.src;
  }

  async getFollowers(handle: string, userHandle?: string, followHandle?: string) {
    const response: UsersResponse = await this.apiGateway.usersHandleFollowersGet(
          this.pageSize, handle, userHandle, followHandle).toPromise();
    console.log('get followers');
    return response;
  }

  async getFollowing(handle: string, userHandle?: string, followHandle?: string) {
    const response: UsersResponse = await this.apiGateway.usersHandleFollowingGet(
      this.pageSize, handle, userHandle, followHandle).toPromise();
    console.log('get following');
    return response;
  }

  async getStatus(statusId: string) {
    const response: StatusResponse = await this.apiGateway.statusesStatusStatusIdGet(statusId).toPromise();
    console.log(response);
    console.log('get status', response.id, response.message, response.date, response.ownerHandle, response.attachmentSrc);
    return new Status(new Message(response.message), response.ownerHandle,
                      new Attachment(response.attachmentSrc, 'image'), response.date, response.id);
  }

  async postStatus(status: Status) {
    let src = 'None';
    if (status.getAttachment() !== undefined) {
      src = status.getAttachment().getSrc();
    }
    const req: PostStatusRequest = {
      message: status.getMessageText(),
      attachmentSrc: src,
      ownerHandle: status.getOwnerHandle()
    };
    const response: Response = await this.apiGateway.statusesPostPost(req).toPromise();
    console.log('post', response);
  }

  async follow(userHandle: string, followHandle: string) {
    const response: Response = await this.apiGateway.followUserHandleFollowHandlePost(followHandle, userHandle).toPromise();
    console.log('follow', response.message);
  }

  async unfollow(userHandle: string, followHandle: string) {
    const response: Response = await this.apiGateway.followUserHandleFollowHandleUnfollowPost(followHandle, userHandle).toPromise();
    console.log('unfollow', response.message);
  }

  async isFollowing(userHandle: string, followHandle: string) {
    const response: IsFollowingResponse = await this.apiGateway.followUserHandleFollowHandleGet(followHandle, userHandle).toPromise();
    const isFollowingBool: boolean = JSON.parse(response.isFollowing);
    console.log(userHandle, ' is following ', followHandle, ' ', isFollowingBool);
    return isFollowingBool;
  }

  async getHashtagStatuses(hashtag: string, startIndex?: string) {
    const response: StatusesIndexResponse = await this.apiGateway.statusesHashtagHashtagGet(this.pageSize, hashtag, startIndex).toPromise();
    return response;
  }


}
