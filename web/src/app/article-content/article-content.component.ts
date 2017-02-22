import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'jfb-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnInit {
  isPageLoaded: boolean = false;
  article: Article;
  constructor(
    private articleService: ArticleService,
    private currentRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.currentRoute.params.subscribe((params) => {
      const articleId = params['articleId'];
      if (articleId) {
        this.articleService.getArticleById(articleId).subscribe(article => {
          this.article = article;
          this.isPageLoaded = true;
        });
      }
    });
  }
}
