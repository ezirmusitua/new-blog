import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'jfb-article-archive',
  templateUrl: './article-archive.component.html',
  styleUrls: ['./article-archive.component.scss']
})
export class ArticleArchiveComponent implements OnInit {
  archives: any[] = [];
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.list().subscribe(res => {
      this.archives = res.items;
    });
  }

}
