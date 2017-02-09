import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { ArticleService } from './article.service';
import { UserService } from './user.service';
import { ResourceService } from './resource.service';

import { AppComponent } from './app.component';
import { FloatingNavBtnComponent } from './floating-nav-btn/floating-nav-btn.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-content/article-content.component';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FloatingNavBtnComponent,
    ArticleListComponent,
    ArticleContentComponent,
    ReadingProgressBarComponent,
    PageNotFoundComponent,
    ArticleEditorComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ArticleService, UserService, ResourceService],
  bootstrap: [AppComponent, FloatingNavBtnComponent]
})

export class AppModule { }
