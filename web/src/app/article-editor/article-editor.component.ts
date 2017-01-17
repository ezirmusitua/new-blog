import { Component, OnInit, Input } from '@angular/core';

import { ArticleService } from '../article.service';
import { MarkdownService } from '../markdown.service';

class Article {
  title: string;
  markdownContent: string;
  htmlContent: string;
  createAt: number;
  updateAt?: number;
  createBy: any;
  constructor (body?: any) {
    this.title = body ? body.title : '';
    this.markdownContent = body ? body.markdownContent : '';
    this.htmlContent = body ? body.htmlContent : '';
    this.createAt = body ? body.createAt : Date.now();
    if (body && body.updateAt) {
      this.updateAt = body.updateAt
    }
    this.createBy = body ? body.createBy : '';
  }
  copy (body: any) {
    this.title = body.title;
    this.markdownContent = body.markdownContent;
    this.htmlContent = body.htmlContent;
    this.createAt = body.createAt;
    if (body.updateAt) {
      this.updateAt = body.updateAt
    }
    this.createBy = body.createBy;
  }
}

@Component({
  selector: 'jfb-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  markdownContent: string = '';
  htmlContent: string = '';
  article: Article = new Article();

  constructor(private MarkdownService: MarkdownService, private ArticleService: ArticleService) { }

  updatePreview (markdownContent: string) {
    this.htmlContent = this.MarkdownService.convert(markdownContent);
  }

  ngOnInit() {
    const articleFromServer = this.ArticleService.getArticleById(1);
    if (articleFromServer.data) {
      this.article.copy(articleFromServer.data);
    }
    this.markdownContent = this.article.markdownContent;
    this.htmlContent = this.article.htmlContent;
  }

  save() {
    this.article.markdownContent = this.markdownContent;
    this.article.htmlContent = this.htmlContent;
    console.log(this.article)
    return;
  }
}
