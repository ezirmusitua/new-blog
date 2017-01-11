import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FloatingNavBtnComponent } from './floating-nav-btn/floating-nav-btn.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-content/article-content.component';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    FloatingNavBtnComponent,
    ArticleListComponent,
    ArticleContentComponent,
    ReadingProgressBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent, FloatingNavBtnComponent, ArticleListComponent, ArticleContentComponent, ReadingProgressBarComponent]
})
export class AppModule { }
