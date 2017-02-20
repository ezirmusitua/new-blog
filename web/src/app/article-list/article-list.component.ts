import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { Subject } from 'rxjs';

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
  articles: Article[] = [];
  needToLoad: boolean = true;
  loadMoreObservable = new Subject();

  loadMoreQuery: any = { pageSize: 10, marker: null, sortBy: '_id', sortOrder: 1 };
  constructor(private articleService: ArticleService) {
  }

  private listArticle() {
    console.log(this.loadMoreQuery);
    this.articleService.listArticleForVisitor(this.loadMoreQuery).subscribe((res) => {
      this.articles = this.articles.concat(res.articles);
      console.log(this.articles, this.articles.length);
      this.loadMoreQuery.marker = res.marker;
      this.totalArticleCount = res.totalCount;
      console.log(this.loadMoreQuery)
    });
  }

  ngOnInit() {
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
    this.loadMoreObservable.subscribe(res => {
      if (res) {
        this.listArticle();
      }
    });
  }
}
