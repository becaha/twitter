import { Injectable } from '@angular/core';
import {Attachment} from './status/attachment/Attachment';
import {
  DefaultService,
  IsFollowingResponse,
  ProfileResponse,
  UserResponse,
  Response,
  StatusResponse, SignupRequest, StatusesResponse
} from '../../api';
import {UpdateProfileRequest} from '../../api/model/updateProfileRequest';
import {Status} from './status/Status';
import {PostStatusRequest} from '../../api/model/postStatusRequest';
import {User} from './user/User';
import {StoryResponse} from '../../api/model/storyResponse';
import {FollowersResponse} from '../../api/model/followersResponse';
import {FollowingResponse} from '../../api/model/followingResponse';
import {Message} from './status/message/Message';


@Injectable({
  providedIn: 'root'
})

// after update and re-downloading of the yaml
// java -jar swagger-codegen-cli.jar generate -i twitter-api-prod-swagger.yaml -l typescript-angular
// -o C:\Users\becab\IdeaProjects\TwitterLab\api --additional-properties supportsES6=true
// then go into the DefaultService and replace the errors with strings


export class ProxyService {
  private apiGateway: DefaultService;

  constructor(apiGateway: DefaultService) {
    this.apiGateway = apiGateway;
  }

  async getUser(handle: string) {
    const response: UserResponse = await this.apiGateway.usersHandleGet(handle).toPromise();
    console.log('getUser', response.handle, response.name, response.password);
    return new User(response.handle, response.name, response.password, new Attachment(response.profile, 'image'));
  }

  async signupUser(user: User) {
    // user.getHandle(), user.getPassword(), user.getName()
    const request: SignupRequest = {
      handle: user.getHandle(),
      password: user.getPassword(),
      name: user.getName()
    };

    const response: Response = await this.apiGateway.usersHandleSignupPost(user.getHandle(), request).toPromise();
    console.log('signup', response.message);
  }

  async getStory(handle: string) {
    const response: StoryResponse = await this.apiGateway.usersHandleStoryGet(handle).toPromise();
    console.log('get story', response);
  }

  async getFeed(handle: string) {
    const response: StatusesResponse = await this.apiGateway.usersHandleFeedGet(handle).toPromise();
    console.log('get feed', response);
  }

  async updateProfile(handle: string, profile: Attachment) {
    const req: UpdateProfileRequest = {
      handle,
      src: profile.getSrc()
    };
    const response: Response = await this.apiGateway.usersHandleProfilePost(handle, req).toPromise();
    console.log('update prof', response.message);
  }

  async getProfile(handle: string) {
    const response: ProfileResponse = await this.apiGateway.usersHandleProfileGet(handle).toPromise();
    console.log('get prof', response.src);
    return response.src;
  }

  async getFollowers(handle: string) {
    const response: FollowersResponse = await this.apiGateway.usersHandleFollowersGet(handle).toPromise();
    console.log('get followers', response);
  }

  async getFollowing(handle: string) {
    const response: FollowingResponse = await this.apiGateway.usersHandleFollowingGet(handle).toPromise();
    console.log('get following', response);
  }

  async getStatus(statusId: string) {
    const response: StatusResponse = await this.apiGateway.statusesStatusStatusIdGet(statusId).toPromise();
    console.log('get status', response.id, response.message, response.date, response.ownerHandle, response.attachmentSrc);
    return new Status(new Message(response.message), response.ownerHandle, new Attachment(response.profile, 'image'), new Attachment(response.attachmentSrc, 'image'), response.date, response.id);
  }

  async postStatus(status: Status) {
    // status.getMessage(), status.getAttachment(), status.getOwner(), status.getDate(), status.getId()
    let src = '';
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
    const response: Response = await this.apiGateway.followUserHandleFollowHandlePost(userHandle, followHandle).toPromise();
    console.log('follow', response.message);
  }

  async unfollow(userHandle: string, followHandle: string) {
    const response: Response = await this.apiGateway.followUserHandleFollowHandleUnfollowPost(userHandle, followHandle).toPromise();
    console.log('unfollow', response.message);
  }

  async isFollowing(userHandle: string, followHandle: string) {
    const isFollowingResponse: IsFollowingResponse = await
      this.apiGateway.followUserHandleFollowHandleGet(userHandle, followHandle).toPromise();
    console.log('is following', isFollowingResponse.isFollowing);
  }


}
