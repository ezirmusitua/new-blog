import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { FloatingNavCategory } from '../shared/enums';

@Component({
  selector: 'jfb-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {
  isPageLoaded: boolean = false;
  articleId: string;
  article: Article;
  constructor(
    private articleService: ArticleService,
    private currentRoute: ActivatedRoute,
    private subjects: RxSubjectService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.currentRoute.params.subscribe((params) => {
    //   this.articleId = params['articleId'];
    //   if (this.articleId) {
    //     this.articleService.getArticleById(this.articleId).subscribe(article => {
    //       this.article = article;
    //       this.isPageLoaded = true;
    //     });
    //   }
    // });
    // this.subjects.floatingNavBtnSubject.subscribe((res) => {
    //   if (res.category === FloatingNavCategory.EDIT) {
    //     this.router.navigate(['article', this.articleId, 'edit']);
    //   }
    // });
  }
}
