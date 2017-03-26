import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry, MdDialog, MdDialogRef } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';

import { RxSubjectService } from '../shared/rx-subject.service';
import { ArticleService } from '../article.service';
import { MarkdownService } from '../markdown.service';
import { Article } from '../models/article';
import { CoverDescriptionEdit } from './dialog-cover-desc-edit.component';
import { ValidErrorIdRange, ArticleViewCategory } from '../shared/enums';
import { Trusted } from '../shared/constant';

@Component({
  selector: 'jfb-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  dialogRef: MdDialogRef<CoverDescriptionEdit>;
  editorCategory: number = 100;
  directoryItems: any[] = [];
  markdownContent: string = '';
  htmlContent: string = '';
  articleId: string;
  floatingNavSubscription: Subscription;
  toastSubject: Subject<any>;
  currentSelected: any;
  uploadedImages: any[] = [];
  article: Article = new Article();

  constructor(
    private markdownService: MarkdownService,
    private articleService: ArticleService,
    private subjects: RxSubjectService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private iconRegistry: MdIconRegistry,
    private dialog: MdDialog
  ) {
    iconRegistry.addSvgIcon('folder',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('folder')));
    iconRegistry.addSvgIcon('folder_open',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('folder_open')));
    iconRegistry.addSvgIcon('article',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('library_books')));
    iconRegistry.addSvgIcon('delete',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('delete', 'black')));
    iconRegistry.addSvgIcon('edit',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('mode_edit', 'black')));
    iconRegistry.addSvgIcon('add',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('add')));
    iconRegistry.addSvgIcon('publish',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('publish')));
  }

  updatePreview(markdownContent: string) {
    // this.htmlContent = this.markdownService.convert(markdownContent);
  }

  private initArticle(article: Article) {
    this.articleId = article._id;
    this.article = article;
    this.markdownContent = this.article.markdownContent;
    this.htmlContent = this.article.htmlContent;
  }

  ngOnInit() {
    // this.currentRoute.params.subscribe((params) => {
    //   const articleId = params['articleId'];
    //   if (articleId) {
    //     this.articleService.getArticleById(articleId).subscribe(article => {
    //       this.initArticle(article);
    //     });
    //   }
    // });
    // this.floatingNavSubscription = this.subjects.floatingNavBtnSubject.subscribe((res) => {
    //   if (res.category === FloatingNavCategory.SAVE) {
    //     this.save();
    //   }
    //   if (res.category === FloatingNavCategory.PREVIEW) {
    //     this.preview();
    //   }
    //   if (res.category === FloatingNavCategory.PUBLISH) {
    //     this.publish();
    //   }
    // });
    // this.toastSubject = this.subjects.toastSubject;
    this.directoryItems = [
      {
        _id: 'folder-1', title: '算法导论题解', createAt: Date.now() - 60 * 60 * 1000, articles: [
          { _id: 'article-1', title: '这是一片测试文章[1]', createAt: Date.now() - 55 * 60 * 1000, selected: false, },
          { _id: 'article-2', title: '这是一片测试文章[2]', createAt: Date.now() - 55 * 60 * 1000, selected: false, },
          { _id: 'article-3', title: '这是一片测试文章[3]', createAt: Date.now() - 50 * 60 * 1000, selected: false, },
          { _id: 'article-4', title: '这是一片测试文章[4]', createAt: Date.now() - 45 * 60 * 1000, selected: false, },
          { _id: 'article-5', title: '这是一片测试文章[5]', createAt: Date.now() - 40 * 60 * 1000, selected: false, },
          { _id: 'article-6', title: '这是一片测试文章[6]', createAt: Date.now() - 35 * 60 * 1000, selected: false, },
          { _id: 'article-7', title: '这是一片测试文章[7]', createAt: Date.now() - 30 * 60 * 1000, selected: false, },
          { _id: 'article-8', title: '这是一片测试文章[8]', createAt: Date.now() - 25 * 60 * 1000, selected: false, },
          { _id: 'article-9', title: '这是一片测试文章[9]', createAt: Date.now() - 20 * 60 * 1000, selected: false, },
          { _id: 'article-10', title: '这是一片测试文章[10]', createAt: Date.now() - 15 * 60 * 1000, selected: false, },
          { _id: 'article-11', title: '这是一片测试文章[11]', createAt: Date.now() - 10 * 60 * 1000, selected: false, },
          { _id: 'article-12', title: '这是一片测试文章[12]', createAt: Date.now() - 5 * 60 * 1000, selected: false, },
          { _id: 'article-13', title: '这是一片测试文章[13]', createAt: Date.now() - 1 * 60 * 1000, selected: false, },
        ], opened: false, selected: false,
      },
      {
        _id: 'folder-2', category: 100, title: '爬虫管理框架', createAt: Date.now() - 60 * 60 * 1000, articles: [
          { _id: 'article-1', title: '这是一片测试文章[1]', createAt: Date.now() - 55 * 60 * 1000, selected: false, },
          { _id: 'article-2', title: '这是一片测试文章[2]', createAt: Date.now() - 55 * 60 * 1000, selected: false, },
          { _id: 'article-3', title: '这是一片测试文章[3]', createAt: Date.now() - 50 * 60 * 1000, selected: false, },
          { _id: 'article-4', title: '这是一片测试文章[4]', createAt: Date.now() - 45 * 60 * 1000, selected: false, },
        ], opened: false, selected: false,
      },
    ];
    this.uploadedImages = Array.from({ length: 10 }, (v, i) => {
      return {
        ariaLabel: `uploaded-image-${i}`,
        src: `https://placeholdit.imgix.net/~text?txtsize=96&bg=ff6f6f&txtclr=ffffff&txt=J%20Z&w=240&h=240`
      };
    });
  }

  private getNextContentByError(error: any) {
    const errorId = parseInt(error, 10);
    if (ValidErrorIdRange.ARTICLE.indexOf(errorId) > -1) {
      return { id: errorId };
    }
  }

  _update() {
    this.article.markdownContent = this.markdownContent;
    this.article.htmlContent = this.htmlContent;
    console.log(this.article.viewCategory);
    return this.articleService.save(this.articleId, this.article);
  }

  save() {
    this.article.viewCategory = ArticleViewCategory.DRAFT;
    this._update().subscribe((article) => {
      this.router.navigate(['/']);
    }, (error) => {
      this.toastSubject.next(this.getNextContentByError(error));
    });
  }

  preview() {
    this.article.viewCategory = ArticleViewCategory.PREVIEW;
    this._update().subscribe((article) => {
      this.router.navigate(['/article', article._id, 'preview']);
    }, (error) => {
      this.toastSubject.next(this.getNextContentByError(error));
    });
  }

  publish() {
    this.article.viewCategory = ArticleViewCategory.PUBLISHED;
    this._update().subscribe((article) => {
      this.router.navigate(['/article', article._id]);
    }, (error) => {
      this.toastSubject.next(this.getNextContentByError(error));
    });
  }

  private toggleFolder(folder) {
    folder.opened = !folder.opened;
  }

  private selectArticle(article) {
    if (this.currentSelected) {
      this.currentSelected.selected = false;
    }
    this.currentSelected = article;
    this.currentSelected.selected = !article.selected;
  }

  public openDialog() {
    console.log(123);
    // this.dialogRef = this.dialog.open(CoverDescriptionEdit, {
    //   disableClose: false
    // });

    // this.dialogRef.afterClosed().subscribe(result => {
    //   console.log('result: ' + result);
    //   this.dialogRef = null;
    // });
  }
}
