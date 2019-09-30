import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { StoryComponent } from './story/story.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { StatusComponent } from './status/status.component';
import { FollowComponent } from './follow/follow.component';
import { StatusesComponent } from './statuses/statuses.component';
import { UploadComponent } from './upload/upload.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    StoryComponent,
    FollowersComponent,
    FollowingComponent,
    StatusComponent,
    FollowComponent,
    StatusesComponent,
    UploadComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
