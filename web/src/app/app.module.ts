import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { ArticleService } from './article.service';
import { UserService } from './user.service';
import { ResourceService } from './resource.service';
import { LocalStorage } from './localStorage.service';

import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-content/article-content.component';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleEditorComponent, OneLineInputDialog } from './article-editor/article-editor.component';
import { ScrollListeningLoaderDirective } from './scroll-listening-loader.directive';
import { RxSubjectService } from './shared/rx-subject.service';
import { ToastComponent } from './toast/toast.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { LoginComponent } from './login/login.component';
import { ArticleArchiveComponent } from './article-archive/article-archive.component';
import { ArchiveListComponent } from './article-archive/archive-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleContentComponent,
    ReadingProgressBarComponent,
    PageNotFoundComponent,
    ArticleEditorComponent,
    ScrollListeningLoaderDirective,
    ToastComponent,
    HeaderNavbarComponent,
    LoginComponent,
    ArticleArchiveComponent,
    ArchiveListComponent,
    OneLineInputDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    OneLineInputDialog,
  ],
  providers: [ArticleService, UserService, ResourceService, LocalStorage, RxSubjectService],
  bootstrap: [AppComponent, ToastComponent,]
})
export class AppModule { }
