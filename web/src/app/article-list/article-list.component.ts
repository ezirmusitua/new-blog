import { Component, OnInit, HostListener } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { Subject } from 'rxjs';

import { Loader } from '../shared/loader';
import { UserService } from '../user.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  loginCounter: number = 0;
  isShowLoginDialog: boolean = false;
  articles: Article[] = [];
  isLoading: boolean = false;
  hasMore: boolean = true;
  loadMoreQuery: any = { pageSize: 10, sortBy: '_id', sortOrder: -1 };
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.listArticle();
  }

  private scrollLoad(event) {
    if (event.shouldLoad) {
      this.listArticle();
    }
  }

  private listArticle() {
    let listPromise = this.articleService.listArticleForVisitor(this.loadMoreQuery);
    if (!this.userService.isVisitor) {
      listPromise = this.articleService.listArticleForAdmin(this.loadMoreQuery);
    }
    if (!this.isLoading && this.hasMore) {
      this.isLoading = true;
      listPromise.subscribe((res) => {
        this.articles = this.articles.concat(res.articles);
        this.loadMoreQuery.marker = res.marker;
        this.isLoading = false;
        if (this.articles.length === res.totalCount) {
          this.hasMore = false;
        }
      });
    }
  }
}
