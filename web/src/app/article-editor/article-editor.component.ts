import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';

import { RxSubjectService } from '../shared/rx-subject.service';
import { ArticleService } from '../article.service';
import { MarkdownService } from '../markdown.service';
import { Article } from '../models/article';
import { FloatingNavCategory, ValidErrorIdRange, ArticleViewCategory } from '../shared/enums';

@Component({
  selector: 'jfb-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  markdownContent: string = '';
  htmlContent: string = '';
  articleId: string;
  floatingNavSubscription: Subscription;
  toastSubject: Subject<any>;
  article: Article = new Article();

  constructor(
    private markdownService: MarkdownService,
    private articleService: ArticleService,
    private subjects: RxSubjectService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  updatePreview(markdownContent: string) {
    this.htmlContent = this.markdownService.convert(markdownContent);
  }

  private initArticle(article: Article) {
    this.articleId = article._id;
    this.article = article;
    this.markdownContent = this.article.markdownContent;
    this.htmlContent = this.article.htmlContent;
  }

  ngOnInit() {
    this.currentRoute.params.subscribe((params) => {
      const articleId = params['articleId'];
      if (articleId) {
        this.articleService.getArticleById(articleId).subscribe(article => {
          this.initArticle(article);
        });
      }
    });
    this.floatingNavSubscription = this.subjects.floatingNavBtnSubject.subscribe((res) => {
      if (res.category === FloatingNavCategory.SAVE) {
        this.save();
      }
      if (res.category === FloatingNavCategory.PREVIEW) {
        this.preview();
      }
      if (res.category === FloatingNavCategory.PUBLISH) {
        this.publish();
      }
    });
    this.toastSubject = this.subjects.toastSubject;
  }

  private getNextContentByError(error: any) {
    const errorId = parseInt(error, 10);
    if (ValidErrorIdRange.ARTICLE.indexOf(errorId) > -1) {
      return { id: errorId };
    }
  }

  _update() {
    this.article.markdownContent = this.markdownContent;
    this.article.htmlContent = this.htmlContent;
    console.log(this.article.viewCategory);
    return this.articleService.save(this.articleId, this.article);
  }

  save() {
    this.article.viewCategory = ArticleViewCategory.DRAFT;
    this._update().subscribe((article) => {
      this.router.navigate(['/']);
    }, (error) => {
      this.toastSubject.next(this.getNextContentByError(error));
    });
  }

  preview() {
    this.article.viewCategory = ArticleViewCategory.PREVIEW;
    this._update().subscribe((article) => {
      this.router.navigate(['/article', article._id, 'preview']);
    }, (error) => {
      this.toastSubject.next(this.getNextContentByError(error));
    });
  }

  publish() {
    this.article.viewCategory = ArticleViewCategory.PUBLISHED;
    this._update().subscribe((article) => {
      this.router.navigate(['/article', article._id]);
    }, (error) => {
      this.toastSubject.next(this.getNextContentByError(error));
    });
  }
}
