import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';

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
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.listArticleForVisitor().subscribe(res => {
      this.articles = res.articles;
      this.totalArticleCount = res.totalCount;
    });
  }

  private showLoginDialog() {
    if (this.loginCounter < 5) {
      this.loginCounter += 1;
    } else {
      this.isShowLoginDialog = true;
      this.loginCounter = 0;
    }
  }
}
