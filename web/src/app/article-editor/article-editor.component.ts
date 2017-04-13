import { Inject, Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry, MdDialog, MdDialogRef } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';

import { RxSubjectService } from '../shared/rx-subject.service';
import { UserService } from '../user.service';
import { ArticleService } from '../article.service';
import { MarkdownService } from '../markdown.service';
import { LocalStorage } from '../localStorage.service';
import { Article } from '../models/article';
import { Session } from '../models/session';
import { groupArticleByBelongToLabel } from '../shared/archive.helper';
import { ValidErrorIdRange, ArticleViewCategory } from '../shared/enums';
import { Trusted, TIME } from '../shared/constant';
import { ErrorCategory } from '../shared/error';

interface SelectedArticleIndex { folderIndex: string; articleIndex: number };

const getSelectedItem = (folder: any, selected: SelectedArticleIndex) => {
  return folder[selected.folderIndex].articles[selected.articleIndex];
};

@Component({
  selector: 'one-line-inpu-dialog',
  template: `
  <div class="dialog-container">
    <h3 class="dialog-title" md-dialog-title> {{ title }} </h3>
    <md-dialog-content>
      <md-input-container class="input-container">
        <input mdInput #lineOne [value]="lineOneValue" [placeholder]="lineOnePlaceholder">
      </md-input-container>
    </md-dialog-content>
    <md-dialog-actions fxLayout="row" fxLayoutAlign="end center">
      <button fxFlex="20%" md-button md-dialog-close>关闭</button>
      <button fxFlex="20%" md-button (click)="dialogRef.close({
        lineOneValue: lineOne.value
      })">保存</button>
    </md-dialog-actions>
  </div>
  `,
  styles: [`
  .dialog-container {
    padding: 8px 0;
  }
  .dialog-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
  }
  .input-container {
    width: 100%;
  }
  `]
})
export class OneLineInputDialog {
  selectedOption: string;
  title: string = 'No title';
  lineOneValue: string = '';
  lineOnePlaceholder: string = '';

  constructor(
    public dialogRef: MdDialogRef<OneLineInputDialog>
  ) { }
}

@Component({
  selector: 'two-line-inpu-dialog',
  template: `
  <div class="dialog-container">
    <h3 class="dialog-title" md-dialog-title> {{ title }} </h3>
    <md-dialog-content>
      <md-input-container class="input-container">
        <input mdInput #lineOne [placeholder]="lineOnePlaceholder" [value]="lineOneValue">
      </md-input-container>
      <md-input-container class="input-container">
        <input mdInput #lineTwo [placeholder]="lineTwoPlaceholder" [value]="lineTwoValue">
      </md-input-container>
    </md-dialog-content>
    <md-dialog-actions fxLayout="row" fxLayoutAlign="end center">
      <button fxFlex="20%" md-button md-dialog-close>关闭</button>
      <button fxFlex="20%" md-button (click)="dialogRef.close({
        lineOneValue: lineOne.value,
        lineTwoValue: lineTwo.value
      })">保存</button>
    </md-dialog-actions>
  </div>
  `,
  styles: [`
  .dialog-container {
    padding: 8px 0;
  }
  .dialog-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
  }
  .input-container {
    width: 100%;
  }
  `]
})
export class TwoLineInputDialog {
  selectedOption: string;
  title: string = 'No title';
  lineOneValue: string = '';
  lineOnePlaceholder: string = '';
  lineTwoValue: string = '';
  lineTwoPlaceholder: string = '';

  constructor(
    public dialogRef: MdDialogRef<OneLineInputDialog>
  ) { }
}

@Component({
  selector: 'jfb-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  editorCategory: number = 100;
  folderItems: any[] = [];
  selected: SelectedArticleIndex;
  article: Article;
  uploadedImages: any[] = [];
  dialogRef: MdDialogRef<any>;
  dialogConfig: any = {
    disableClose: false,
    width: '512px',
  };
  viewCategoryOptions: { key: string; value: number }[] = [
    { key: '文章可见状态', value: 666 },
    { key: '已保存', value: 100 },
    { key: '已发布', value: 200 },
  ];

  constructor(
    private userService: UserService,
    private markdownService: MarkdownService,
    private ls: LocalStorage,
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

  ngOnInit() {
    let authStr = this.ls.getSession();
    if (authStr) {
      this.userService.validateSession(Session.constructFromLcStr(authStr));
    }
    this.userService.isVisitor.subscribe(res => {
      if (res) return;
      this.articleService.list().subscribe(res => {
        this.folderItems = groupArticleByBelongToLabel(res.items
          .map(article => Object.assign(article, { selected: false })))
          .map(folder => Object.assign(folder, { opened: false }));
      });
    })
    this.uploadedImages = Array.from({ length: 10 }, (v, i) => {
      return {
        ariaLabel: `uploaded-image - ${i}`,
        src: `https://placeholdit.imgix.net/~text?txtsize=96&bg=ff6f6f&txtclr=ffffff&txt=J%20Z&w=240&h=240`
      };
    });
    setInterval(() => {
      if (!this.article || Article.isInvalid(this.article)) {
        console.log('nothing to save ~');
      }
      this.article.viewCategory = ArticleViewCategory.DRAFT;
      const articleId = this.article._id;
      this.articleService.updateOrCreate(this.article._id, this.article).subscribe((res) => {
        console.log(`article: ${articleId} auto saved ~`);
      });
    }, 1 * TIME.MINUTE);
  }

  private getNextContentByError(error: any) {
    const errorId = parseInt(error, 10);
    if (ValidErrorIdRange.ARTICLE.indexOf(errorId) > -1) {
      return { id: errorId };
    }
  }

  publish() {
    if (Article.isInvalid(this.article)) {
      this.subjects.toastSubject.next({ id: 3099 });
    } else {
      this.article.viewCategory = ArticleViewCategory.PUBLISHED;
      this.articleService.updateOrCreate(this.article._id, this.article).subscribe(() => {
        this.subjects.toastSubject.next({ id: 3003 });
        const prevSelectedArticle = getSelectedItem(this.folderItems, this.selected);
        prevSelectedArticle.title = this.article.title;
      }, (error) => {
        this.subjects.toastSubject.next(this.getNextContentByError(error));
      });
    }
  }

  private toggleFolder(folder) {
    folder.opened = !folder.opened;
  }

  private selectArticle(folderIndex, articleIndex) {
    // TODO: load from server
    if (this.selected) {
      const prevSelectedArticle = getSelectedItem(this.folderItems, this.selected);
      prevSelectedArticle.selected = false;
      this.articleService.updateOrCreate(this.article._id, this.article).subscribe((res) => {
        console.log('previous saved');
      });
    }
    this.selected = { folderIndex, articleIndex };
    const selectedArticle = getSelectedItem(this.folderItems, this.selected);
    selectedArticle.selected = true;
    this.articleService.getArticleById(selectedArticle._id.toString(), { mode: 'edit' }).subscribe(res => {
      this.article = res;
    }, (err) => {
      this.subjects.toastSubject.next({ id: ErrorCategory.DOCUMENT_NOT_FOUND });
    });
  }

  public openBelongToEditDialog() {
    this.dialogRef = this.dialog.open(OneLineInputDialog, this.dialogConfig);
    this.dialogRef.componentInstance.title = '文章类别';
    this.dialogRef.componentInstance.lineOnePlaceholder = '请输入文章类别标签';
    this.dialogRef.componentInstance.lineOneValue = this.article.belongToLabel || '';
    this.dialogRef.afterClosed().subscribe((res: { lineOneValue: any }) => {
      if (res.lineOneValue !== this.article.description) {
        this.article.belongToLabel = res.lineOneValue;
      }
      this.dialogRef = null;
    });
  }

  public openTitleEditDialog() {
    this.dialogRef = this.dialog.open(OneLineInputDialog, this.dialogConfig);
    this.dialogRef.componentInstance.title = '文章描述';
    this.dialogRef.componentInstance.lineOnePlaceholder = '请输入文章描述';
    this.dialogRef.componentInstance.lineOneValue = this.article.description || '';
    this.dialogRef.afterClosed().subscribe((res: { lineOneValue: any }) => {
      if (res.lineOneValue !== this.article.description) {
        this.article.description = res.lineOneValue;
      }
      this.dialogRef = null;
    });
  }

  public openCoverEditDialog() {
    this.dialogRef = this.dialog.open(OneLineInputDialog, this.dialogConfig);
    this.dialogRef.componentInstance.title = '图片链接';
    this.dialogRef.componentInstance.lineOneValue = this.article.coverUrl || '';
    this.dialogRef.componentInstance.lineOnePlaceholder = '请输入文章封面图片链接';
    this.dialogRef.afterClosed().subscribe((res: { lineOneValue: string }) => {
      if (res.lineOneValue !== this.article.coverUrl) {
        this.article.coverUrl = res.lineOneValue;
        this.article.images.push({ label: 'article cover', url: res.lineOneValue });
      }
      this.dialogRef = null;
    });
  }

  public addNewArticle() {
    this.dialogRef = this.dialog.open(TwoLineInputDialog, this.dialogConfig);
    this.dialogRef.componentInstance.title = '添加文章';
    this.dialogRef.componentInstance.lineOnePlaceholder = '请输入文章系列名称';
    this.dialogRef.componentInstance.lineTwoPlaceholder = '请输入文章标题';
    this.dialogRef.afterClosed().subscribe((res: { lineOneValue: string; lineTwoValue: string }) => {
      this.article = new Article({ _id: 'new', title: res.lineTwoValue, belongToLabel: res.lineOneValue });
      this.dialogRef = null;
    });
  }
}
