import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { Md5 } from 'ts-md5/dist/md5';

import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { MarkdownService } from '../markdown.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { FloatingNavCategory } from '../shared/enums';
import { Trusted } from '../shared/constant';

@Component({
  selector: 'jfb-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {
  articleId: string;
  article: Article;
  content: SafeHtml;
  commentAreaOpened: boolean = false
  constructor(
    private markdownService: MarkdownService,
    private articleService: ArticleService,
    private currentRoute: ActivatedRoute,
    private subjects: RxSubjectService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private iconRegistry: MdIconRegistry
  ) {
    iconRegistry.addSvgIcon('favorite',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('favorite', 'black')));
    iconRegistry.addSvgIcon('comment',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('comment', 'black')));
  }

  ngOnInit() {
    this.currentRoute.params.subscribe((params) => {
      this.articleId = params['articleId'];
      if (this.articleId) {
        this.articleService.getArticleById(this.articleId, { mode: 'view' }).subscribe(article => {
          this.article = article;
          console.log(this.article);
          this.content = this.markdownService.toHtml(article.content)
            .sanitize().end() as SafeHtml;
        });
      }
    });
  }

  private generateGravatarSrc(email: string) {
    const hash = Md5.hashStr(email);
    return `https://www.gravatar.com/avatar/${hash}?s=48`;
  }

  private openCommentArea() {
    this.commentAreaOpened = true;
  }

  private toggleLike() {
    return;
  }
}
