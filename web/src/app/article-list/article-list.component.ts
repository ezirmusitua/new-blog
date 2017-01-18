import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  loginCounter: number = 0;
  isShowLoginDialog: boolean = false;
  articleList = [{
    title: 'hello world ~ 1',
    updateAt: Date.now(),
    tags: ['h1', 'h2'],
    description: 'hello world'
  }, {
    title: 'hello world ~ 1',
    updateAt: Date.now(),
    tags: ['h1', 'h2'],
    description: 'hello world'
  }];
  constructor() { }

  ngOnInit() { }

  private showLoginDialog() {
    if (this.loginCounter < 5) {
      this.loginCounter += 1;
    } else {
      this.isShowLoginDialog = true;
      this.loginCounter = 0;
    }
  }
}
