import {Component, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StoryComponent} from './story/story.component';
import {FeedComponent} from './feed/feed.component';
import {FollowingComponent} from './following/following.component';
import {FollowersComponent} from './followers/followers.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: ':user.handle', component: ProfileComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'story', component: StoryComponent},
  {path: 'followers', component: FollowersComponent},
  {path: 'following', component: FollowingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
