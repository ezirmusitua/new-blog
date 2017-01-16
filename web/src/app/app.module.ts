import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FloatingNavBtnComponent } from './floating-nav-btn/floating-nav-btn.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-content/article-content.component';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ArticleService } from './article.service';

@NgModule({
  declarations: [
    AppComponent,
    FloatingNavBtnComponent,
    ArticleListComponent,
    ArticleContentComponent,
    ReadingProgressBarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent, FloatingNavBtnComponent]
})

export class AppModule { }
