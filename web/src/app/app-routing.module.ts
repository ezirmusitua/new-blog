import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-content/article-content.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ArticleArchiveComponent } from './article-archive/article-archive.component';


const appRoutes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'archive', component: ArticleArchiveComponent },
  { path: 'article/:articleId', component: ArticleContentComponent },
  { path: 'dashboard', component: ArticleEditorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
