import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jfb-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
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

  ngOnInit() {
  }

}
