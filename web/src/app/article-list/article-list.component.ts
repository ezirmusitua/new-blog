import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';

import { Loader } from '../shared/loader';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  loginCounter: number = 0;
  isShowLoginDialog: boolean = false;
  totalArticleCount: number = 0;
  articleLoader: Loader<Article> = new Loader<Article>();
  articles: Article[] = [];
  constructor(private articleService: ArticleService) {
    this.articleLoader.listMethod = this.articleService.loaderListMethod;
    console.log(this.articleLoader)
  }

  private listArticle() {
    var articlesObservable = this.articleLoader.load(true);
    if (articlesObservable) {
      articlesObservable.subscribe(res => {
        console.log(res);
      })
    }
  }

  ngOnInit() {
    console.log(this.articleLoader, this.listArticle);
    this.listArticle();
  }

  private showLoginDialog() {
    if (this.loginCounter < 5) {
      this.loginCounter += 1;
    } else {
      this.isShowLoginDialog = true;
      this.loginCounter = 0;
    }
  }

  private loadMore() {
    console.log(123123);
  }
}
