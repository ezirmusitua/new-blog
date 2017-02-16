import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Article } from '../models/article';

import { ArticleService } from '../article.service';
import { MarkdownService } from '../markdown.service';

@Component({
  selector: 'jfb-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  markdownContent: string = '';
  htmlContent: string = '';
  article: Article = new Article();

  constructor(
    private markdownService: MarkdownService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  updatePreview(markdownContent: string) {
    this.htmlContent = this.markdownService.convert(markdownContent);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const articleId = params['articleId'];
      if (articleId) {
        console.log('debug: ', articleId);
        this.articleService.getArticleById(articleId).subscribe(article => {
          this.article = article
          this.markdownContent = this.article.markdownContent;
          this.htmlContent = this.article.htmlContent;
        });
      }
    });
  }

  save() {
    this.article.markdownContent = this.markdownContent;
    this.article.htmlContent = this.htmlContent;
    console.log(this.article)
    return;
  }
}
