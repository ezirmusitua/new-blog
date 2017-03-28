import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Subject } from 'rxjs';

import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { Loader } from '../shared/loader';
import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { ErrorCategory } from '../shared/error';
import { Trusted } from '../shared/constant';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  currentArticle: Article;
  toastSubject: Subject<any>;
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private subjects: RxSubjectService,
    private sanitizer: DomSanitizer,
    private iconRegistry: MdIconRegistry
  ) {
    iconRegistry.addSvgIcon('comment',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('comment', 'black')));
    iconRegistry.addSvgIcon('like',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('favorite', 'black')));
    iconRegistry.addSvgIcon('forward',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('forward', 'black')));
  }

  ngOnInit() {
    this.articleService.list().subscribe((res) => {
      this.articles = res.items;
      this.articleService.getArticleById(res.items[0]._id, { mode: 'list' }).subscribe(res => {
        this.currentArticle = res;
      });
    }, (error) => {
      this.toastSubject.next({ id: ErrorCategory.DOCUMENT_NOT_FOUND });
    });
    this.toastSubject = this.subjects.toastSubject;
  }

  private listArticle() {
    this.articleService.list().subscribe((res) => {
      this.articles = res.items;
    }, (error) => {
      this.toastSubject.next({ id: ErrorCategory.DOCUMENT_NOT_FOUND });
    });
  }

  private chooseArticleByClick(index: number) {
    const articleId = this.articles[index]._id;
    this.articleService.getArticleById(articleId, { mode: 'list' }).subscribe((res) => {
      this.currentArticle = res;
    });
  }
}
