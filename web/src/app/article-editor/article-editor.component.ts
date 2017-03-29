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
import { groupArticleByBelongToLabel } from '../shared/archive.helper';
import { ValidErrorIdRange, ArticleViewCategory } from '../shared/enums';
import { Trusted } from '../shared/constant';

@Component({
  selector: 'jfb-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  // dialogRef: MdDialogRef<CoverDescriptionEdit>;
  editorCategory: number = 100;
  directoryItems: any[] = [];
  toastSubject: Subject<any>;
  currentSelected: any;
  uploadedImages: any[] = [];

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

  ngOnInit() {
    console.log(1111111111111111111111123);
    this.articleService.list().subscribe(res => {
      this.directoryItems = groupArticleByBelongToLabel(res.items
        .map(article => Object.assign(article, { selected: false })))
        .map(directory => Object.assign(directory, { opened: false }));
    });
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

  // _update() {
  //   this.article.content = this.content;
  //   return this.articleService.updateOrCreate(this.articleId, this.article);
  // }

  // save() {
  //   this.article.viewCategory = ArticleViewCategory.DRAFT;
  //   this._update().subscribe((article) => {
  //     this.router.navigate(['/']);
  //   }, (error) => {
  //     this.toastSubject.next(this.getNextContentByError(error));
  //   });
  // }

  // preview() {
  //   this.article.viewCategory = ArticleViewCategory.PREVIEW;
  //   this._update().subscribe((article) => {
  //     this.router.navigate(['/article', article._id, 'preview']);
  //   }, (error) => {
  //     this.toastSubject.next(this.getNextContentByError(error));
  //   });
  // }

  // publish() {
  //   this.article.viewCategory = ArticleViewCategory.PUBLISHED;
  //   this._update().subscribe((article) => {
  //     this.router.navigate(['/article', article._id]);
  //   }, (error) => {
  //     this.toastSubject.next(this.getNextContentByError(error));
  //   });
  // }

  private toggleFolder(folder) {
    folder.opened = !folder.opened;
  }

  private selectArticle(article) {
    // TODO: load from server
    if (this.currentSelected) {
      this.currentSelected.selected = false;
    }
    this.currentSelected = article;
    this.currentSelected.selected = !article.selected;
  }

  public openDialog() {
    // this.dialogRef = this.dialog.open(CoverDescriptionEdit, {
    //   disableClose: false
    // });

    // this.dialogRef.afterClosed().subscribe(result => {
    //   console.log('result: ' + result);
    //   this.dialogRef = null;
    // });
  }
}
