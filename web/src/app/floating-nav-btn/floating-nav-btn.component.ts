import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { FloatingNavCategory } from '../shared/enums';

const homePageUrlPattern = /\//;
const articleListUrlPattern = /\/articles/;
const articleViewUrlPattern = /\/article\/(\w{24})/;
const articleEditUrlPattern = /\/article\/(\w{24})\/edit/;
const articleCreateUrlPattern = /\/article/;

interface NavButton {
  in: string[];
  label?: string;
  iconSrc: string;
  action: any;
  isShow?: boolean;
  needLogin?: boolean;
  hideLogin?: boolean;
}

const matchCurrentRouteUrl = (target: string): any => {
  let matchRes = target.match(articleListUrlPattern);
  if (matchRes) {
    return { type: 'home' };
  }
  matchRes = target.match(articleEditUrlPattern);
  if (matchRes) {
    return { type: 'article-edit', id: matchRes[1] };
  }
  matchRes = target.match(articleViewUrlPattern);
  if (matchRes) {
    return { type: 'article-view', id: matchRes[1] };
  }
  matchRes = target.match(articleCreateUrlPattern);
  if (matchRes) {
    return { type: 'article-create' };
  }
  matchRes = target.match(homePageUrlPattern);
  if (matchRes) {
    return { type: 'home' };
  }
}

@Component({
  selector: 'jfb-floating-nav-btn',
  templateUrl: './floating-nav-btn.component.html',
  styleUrls: ['./floating-nav-btn.component.scss']
})
export class FloatingNavBtnComponent implements OnInit {
  _subject: Subject<any>;
  currentState: string;
  currentId: string;
  buttons: NavButton[] = [];
  constructor(
    private router: Router,
    private subjects: RxSubjectService,
    private userService: UserService
  ) {
    this.router.events.subscribe(change => {
      const matchRes = matchCurrentRouteUrl(change.url);
      this.currentState = matchRes.type;
      this.currentId = matchRes.id;
    })
  }
  ngOnInit() {
    this._subject = this.subjects.floatingNavBtnSubject;
    this.buttons = [
      {
        in: ['home', 'article-view'],
        label: '登录',
        iconSrc: 'assets/icons/ic_account_circle_white_24px.svg',
        isShow: true,
        hideLogin: true,
        action: { next: { category: FloatingNavCategory.LOGIN } }
      },
      {
        in: ['home'],
        label: '关于我',
        iconSrc: 'assets/icons/ic_assignment_ind_white_24px.svg',
        isShow: false,
        action: {
          redirect: '/about-me', params: []
        }
      },
      {
        in: ['home'],
        label: '友链',
        iconSrc: 'assets/icons/ic_group_white_24px.svg',
        isShow: false,
        action: {
          redirect: '/friend-link'
        }
      },
      {
        in: ['article-view'],
        label: '编辑',
        iconSrc: 'assets/icons/ic_mode_edit_white_24px.svg',
        isShow: true,
        needLogin: true,
        action: { next: { category: FloatingNavCategory.EDIT } }
      },
      {
        in: ['article-create', 'article-edit'],
        label: '预览',
        iconSrc: 'assets/icons/ic_pageview_white_24px.svg',
        isShow: true,
        needLogin: true,
        action: { next: { category: FloatingNavCategory.PREVIEW } }
      },
      {
        in: ['article-create', 'article-edit'],
        label: '保存',
        iconSrc: 'assets/icons/ic_save_white_24px.svg',
        isShow: true,
        needLogin: true,
        action: { next: { category: FloatingNavCategory.SAVE } }
      },
      {
        in: ['article-create', 'article-edit'],
        label: '发布',
        iconSrc: 'assets/icons/ic_publish_white_24px.svg',
        isShow: true,
        needLogin: true,
        action: { next: { category: FloatingNavCategory.PUBLISH } }
      },
      {
        in: ['article-view'],
        label: '主页',
        iconSrc: 'assets/icons/ic_home_white_24px.svg',
        isShow: true,
        action: {
          redirect: '/', params: []
        }
      },
      {
        in: ['article-view'],
        label: '资源',
        iconSrc: 'assets/icons/ic_file_download_white_24px.svg',
        needLogin: true,
        action: {
          redirect: '/resources', params: [this.currentId]
        }
      },
      {
        in: ['article-view'],
        label: '阅读模式',
        iconSrc: 'assets/icons/ic_chrome_reader_mode_white_24px.svg',
        needLogin: true,
        action: {
          redirect: '/article', params: [this.currentId, 'zen']
        }
      },
    ]
  }

  private filteredButtons() {
    return this.buttons.filter((button) => {
      const isVisitor = this.userService.isVisitor;
      if (!button.isShow) return false;
      if (isVisitor && button.needLogin) return false;
      if (!isVisitor && button.hideLogin) return false;
      return button.in.indexOf(this.currentState) > -1;
    });
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
