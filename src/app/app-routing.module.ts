import {Component, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StoryComponent} from './story/story.component';
import {FeedComponent} from './feed/feed.component';
import {FollowingComponent} from './following/following.component';
import {FollowersComponent} from './followers/followers.component';
import {SignupComponent} from './signup/signup.component';
import {SearchComponent} from './search/search.component';
import {StatusComponent} from './status/status.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'story/:handle', component: StoryComponent},
  {path: ':handle/followers', component: FollowersComponent},
  {path: ':handle/following', component: FollowingComponent},
  {path: 'search/:text', component: SearchComponent},
  {path: 'status/:id', component: StatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
