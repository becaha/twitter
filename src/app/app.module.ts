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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    StoryComponent,
    FollowersComponent,
    FollowingComponent,
    StatusComponent,
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
