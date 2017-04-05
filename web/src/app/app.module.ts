import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { ArticleService } from './article.service';
import { UserService } from './user.service';
import { ResourceService } from './resource.service';
import { LocalStorage } from './localStorage.service';

import { AppComponent } from './app.component';
import { FloatingNavBtnComponent } from './floating-nav-btn/floating-nav-btn.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-content/article-content.component';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RxSubjectService } from './shared/rx-subject.service';
import { ToastComponent } from './toast/toast.component';
import { InstantViewTextareaComponent } from './instant-view-textarea/instant-view-textarea.component';

@NgModule({
  declarations: [
    AppComponent,
    FloatingNavBtnComponent,
    ArticleListComponent,
    ArticleContentComponent,
    ReadingProgressBarComponent,
    PageNotFoundComponent,
    ArticleEditorComponent,
    LoginModalComponent,
    ToastComponent,
    InstantViewTextareaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [ArticleService, UserService, ResourceService, LocalStorage, RxSubjectService],
  bootstrap: [AppComponent, FloatingNavBtnComponent, ToastComponent]
})
export class AppModule { }
