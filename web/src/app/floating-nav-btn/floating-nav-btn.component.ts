import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { RxSubjectService } from '../shared/rx-subject.service';

const homePageUrlPattern = /\//;
const articleListUrlPattern = /\/articles/;
const articleViewUrlPattern = /\/article\/(\w{24})/;
const articleEditUrlPattern = /\/article\/(\w{24})\/edit/;
const articleCreateUrlPattern = /\/article/;

interface NavButton {
  label?: string;
  iconHref: string;
  action: any;
}

const matchCurrentRouteUrl = (target: string): any => {
  console.log(articleEditUrlPattern.exec(target))
  let matchRes = target.match(articleEditUrlPattern);
  if (matchRes) {
    return { type: 'article-edit', id: matchRes[1] };
  }
  matchRes = target.match(articleViewUrlPattern);
  console.log(matchRes);
  if (matchRes) {
    return { type: 'article-view', id: matchRes[1] };
  }
  matchRes = target.match(articleCreateUrlPattern);
  if (matchRes) {
    return { type: 'article-create' };
  }
  matchRes = target.match(articleListUrlPattern);
  if (matchRes) {
    return { type: 'home' };
  }
  matchRes = target.match(homePageUrlPattern);
  if (matchRes) {
    return { type: 'home' };
  }
}

@Component({
  selector: 'jfb-floating-nav-btn',
  templateUrl: './floating-nav-btn.component.html',
  styleUrls: ['./floating-nav-btn.component.css']
})
export class FloatingNavBtnComponent implements OnInit {
  _subject: Subject<any>;
  buttons: NavButton[] = [];
  constructor(
    private router: Router,
    private subjects: RxSubjectService) {
    this.router.events.subscribe(change => {
      console.log(change);
      const matchRes = matchCurrentRouteUrl(change.url);
      if (matchRes.type === 'home') {
        this.initHomePage();
        console.log('in home page/list');
      }
      if (matchRes.type === 'article-view') {
        this.initArticleView(matchRes.id)
        console.log('in article view');
      }
      if (matchRes.type === 'article-edit') {
        this.initArticleCreateAndEdit(matchRes.id);
        console.log('in article edit');
      }
      if (matchRes.type === 'article-create') {
        this.initArticleCreateAndEdit();
        console.log('in article create');
      }
    })
  }
  ngOnInit() {
    this._subject = this.subjects.floatingNavBtnSubject;
    console.log(this.subjects.floatingNavBtnSubject);
  }

  private initHomePage() {
    this.buttons = [
      { label: 'Login', iconHref: '/', action: { next: { category: 400 } } },
      { label: 'About me', iconHref: '/', action: { redirect: '/about-me', params: [] } },
      { label: 'Friend links', iconHref: '/', action: { redirect: '/friend-link' } },
    ];
  }

  private initArticleView(articleId?: string) {
    this.buttons = [
      { label: 'Home', iconHref: '/', action: { redirect: '/', params: [] } },
      { label: 'Resources', iconHref: '/', action: { redirect: '/resources', params: [articleId] } },
      { label: 'Reading', iconHref: '/', action: { redirect: '/article', params: [articleId, 'zen'] } },
    ]
  }

  private initArticleCreateAndEdit(articleId?: string) {
    this.buttons = [
      { label: 'Preview', iconHref: '/', action: { next: { category: 200 } } },
      { label: 'Save', iconHref: '/', action: { next: { category: 100 } } },
      { label: 'Publish', iconHref: '/', action: { next: { category: 300 } } },
    ]
  }

  private act(action) {
    if (action.redirect) {
      this.router.navigate([action.redirect].concat(action.params))
    }
    if (action.next) {
      this._subject.next(action.next);
    }
  }
}
