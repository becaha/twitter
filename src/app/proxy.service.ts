import { Injectable } from '@angular/core';
import {Attachment} from './status/attachment/Attachment';
import {
  DefaultService,
  IsFollowingResponse,
  ProfileResponse,
  UserResponse,
  Response,
  FollowersResponse,
  FollowingResponse, StoryResponse, StatusResponse, FeedResponse, SignupRequest
} from '../../api';
import {UpdateProfileRequest} from '../../api/model/updateProfileRequest';
import {Status} from './status/Status';
import {PostStatusRequest} from '../../api/model/postStatusRequest';
import {User} from './user/User';

@Injectable({
  providedIn: 'root'
})

// after update and re-downloading of the yaml
// java -jar swagger-codegen-cli.jar generate -i twitter-api-prod-swagger.yaml -l typescript-angular -o C:\Users\becab\IdeaProjects\TwitterLab\api --additional-properties supportsES6=true
// then go into the DefaultService and replace the errors with strings


export class ProxyService {
  private apiGateway: DefaultService;

  constructor(apiGateway: DefaultService) {
    this.apiGateway = apiGateway;
  }

  async getUser(handle: string) {
    const response: UserResponse = await this.apiGateway.usersHandleGet(handle).toPromise();
    console.log(response.handle, response.name, response.password);
  }

  async signupUser(user: User) {
    // user.getHandle(), user.getPassword(), user.getName()
    const request: SignupRequest = new SignupRequest(user);
    const response: Response = await this.apiGateway.usersHandleSignupPost(user.getHandle(), request).toPromise();
    console.log(response.message);
  }

  async getStory(handle: string) {
    const response: StoryResponse = await this.apiGateway.usersHandleStoryGet(handle).toPromise();
    console.log(response);
  }

  async getFeed(handle: string) {
    const response: FeedResponse = await this.apiGateway.usersHandleFeedGet(handle).toPromise();
    console.log(response);
  }

  async updateProfile(handle: string, profile: Attachment) {
    const req: UpdateProfileRequest = new UpdateProfileRequest(handle, profile.getSrc());
    const response: Response = await this.apiGateway.usersHandleProfilePost(handle, req).toPromise();
    console.log(response.message);
  }

  async getProfile(handle: string) {
    const response: ProfileResponse = await this.apiGateway.usersHandleProfileGet(handle).toPromise();
    console.log(response.src);
  }

  async getFollowers(handle: string) {
    const response: FollowersResponse = await this.apiGateway.usersHandleFollowersGet(handle).toPromise();
    console.log(response);
  }

  async getFollowing(handle: string) {
    const response: FollowingResponse = await this.apiGateway.usersHandleFollowingGet(handle).toPromise();
    console.log(response);
  }

  async getStatus(statusId: string) {
    const response: StatusResponse = await this.apiGateway.statusesStatusStatusIdGet(statusId).toPromise();
    console.log(response.id, response.message, response.date, response.ownerHandle, response.attachmentSrc);
  }

  async postStatus(status: Status) {
    // status.getMessage(), status.getAttachment(), status.getOwner(), status.getDate(), status.getId()
    const req: PostStatusRequest = new PostStatusRequest(status);
    const response: Response = await this.apiGateway.statusesPostPost(req).toPromise();
    console.log(response);
  }

  async follow(userHandle: string, followHandle: string) {
    const response: Response = await this.apiGateway.followUserHandleFollowHandlePost(userHandle, followHandle).toPromise();
    console.log(response.message);
  }

  async unfollow(userHandle: string, followHandle: string) {
    const response: Response = await this.apiGateway.followUserHandleFollowHandleUnfollowPost(userHandle, followHandle).toPromise();
    console.log(response.message);
  }

  async isFollowing(userHandle: string, followHandle: string) {
    const isFollowingResponse: IsFollowingResponse = await this.apiGateway.followUserHandleFollowHandleGet(userHandle, followHandle).toPromise();
    console.log(isFollowingResponse.isFollowing);
  }


}
