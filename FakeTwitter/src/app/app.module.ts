import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { ProfileComponent } from './tools/profile/profile.component'

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PostComponent } from './pages/post/post.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { PostShowComponent } from './tools/post-show/post-show.component';
import { ReplyComponent } from './tools/reply/reply.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    ProfileComponent,
    PostComponent,
    CreatePostComponent,
    PostShowComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
