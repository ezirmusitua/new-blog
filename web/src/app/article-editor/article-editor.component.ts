import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  articleId: string;
  article: Article = new Article();

  constructor(
    private markdownService: MarkdownService,
    private articleService: ArticleService,
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
          console.log(article);
          this.initArticle(article);
        });
      }
    });
  }

  save() {
    this.article.markdownContent = this.markdownContent;
    this.article.htmlContent = this.htmlContent;
    this.articleService.save(this.articleId, this.article).subscribe((article) => {
      if (article && this.articleId && this.articleId === article._id) {
        this.initArticle(article);
      }
      if (article && !this.articleId && article._id) {
        this.router.navigate(['/article', article._id, '/edit']);
      }
    })
    return;
  }
}
