import { Component, OnInit, HostListener } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { Subject } from 'rxjs';

import { Loader } from '../shared/loader';
import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { ErrorCategory } from '../shared/error';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  isVisitor: boolean = true;
  isShowLoginDialog: boolean = false;
  articles: Article[] = [];
  isLoading: boolean = false;
  toastSubject: Subject<any>;
  hasMore: boolean = true;
  loadMoreQuery: any = { pageSize: 10, sortBy: '_id', sortOrder: -1 };
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private subjects: RxSubjectService
  ) {
  }

  ngOnInit() {
    this.listArticle();
    this.toastSubject = this.subjects.toastSubject;
  }

  private scrollLoad(event) {
    if (event.shouldLoad) {
      this.listArticle();
    }
  }

  private listArticle() {
    if (!this.isLoading && this.hasMore) {
      this.isLoading = true;
      this.articleService.listArticle(this.loadMoreQuery).subscribe((res) => {
        this.articles = this.articles.concat(res.articles);
        this.loadMoreQuery.marker = res.marker;
        this.isLoading = false;
        if (this.articles.length === res.totalCount) {
          this.hasMore = false;
        }
      }, (error) => {
        this.toastSubject.next({ id: ErrorCategory.DOCUMENT_NOT_FOUND });
      });
    }
  }
}
