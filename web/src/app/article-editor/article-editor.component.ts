import { Inject, Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry, MdDialog, MdDialogRef } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';

import { RxSubjectService } from '../shared/rx-subject.service';
import { ArticleService } from '../article.service';
import { MarkdownService } from '../markdown.service';
import { Article } from '../models/article';
import { groupArticleByBelongToLabel } from '../shared/archive.helper';
import { ValidErrorIdRange, ArticleViewCategory } from '../shared/enums';
import { Trusted, TIME } from '../shared/constant';
import { ErrorCategory } from '../shared/error';
import { UploaderBuilder } from 'qiniu4js';

interface SelectedArticleIndex { folderIndex: string; articleIndex: number };

const getSelectedItem = (folder: any, selected: SelectedArticleIndex) => {
  return folder[selected.folderIndex].articles[selected.articleIndex];
};

@Component({
  selector: 'dialog-result-example',
  template: `
  <div class="dialog-container">
    <h3 class="dialog-title" md-dialog-title> {{ title }} </h3>
    <md-dialog-content>
      <md-input-container class="input-container">
        <input mdInput #howMuch [placeholder]="placeholder">
      </md-input-container>
    </md-dialog-content>
    <md-dialog-actions fxLayout="row" fxLayoutAlign="end center">
      <button fxFlex="20%" md-button md-dialog-close>关闭</button>
      <button fxFlex="20%" md-button (click)="dialogRef.close(howMuch.value)">保存</button>
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
  placeholder: string;

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
  dialogRef: MdDialogRef<OneLineInputDialog>;
  oneLineDialogConfig: any = {
    disableClose: false,
    width: '512px',
  };

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
    this.articleService.list().subscribe(res => {
      this.folderItems = groupArticleByBelongToLabel(res.items
        .map(article => Object.assign(article, { selected: false })))
        .map(folder => Object.assign(folder, { opened: false }));
    });
    this.uploadedImages = Array.from({ length: 10 }, (v, i) => {
      return {
        ariaLabel: `uploaded-image - ${i}`,
        src: `https://placeholdit.imgix.net/~text?txtsize=96&bg=ff6f6f&txtclr=ffffff&txt=J%20Z&w=240&h=240`
      };
    });
    setInterval(() => {
      if (!this.article) {
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
    this.article.viewCategory = ArticleViewCategory.PUBLISHED;
    this.articleService.updateOrCreate(this.article._id, this.article).subscribe(() => {
      this.subjects.toastSubject.next({ id: 3003 });
      const prevSelectedArticle = getSelectedItem(this.folderItems, this.selected);
      prevSelectedArticle.title = this.article.title;
    }, (error) => {
      this.subjects.toastSubject.next(this.getNextContentByError(error));
    });
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

  public openTitleEditDialog() {
    this.dialogRef = this.dialog.open(OneLineInputDialog, this.oneLineDialogConfig);
    this.dialogRef.componentInstance.title = '文章描述';
    this.dialogRef.componentInstance.placeholder = '请输入文章描述';
    this.dialogRef.afterClosed().subscribe((res: string) => {
      if (res && res !== this.article.description) {
        this.article.description = res;
      }
      this.dialogRef = null;
    });
  }

  public openCoverEditDialog() {
    this.dialogRef = this.dialog.open(OneLineInputDialog, this.oneLineDialogConfig);
    this.dialogRef.componentInstance.title = '图片链接';
    this.dialogRef.componentInstance.placeholder = '请输入文章封面图片链接';
    this.dialogRef.afterClosed().subscribe((res: string) => {
      if (res && res !== this.article.coverUrl) {
        this.article.coverUrl = res;
        this.article.images.push({ label: 'article cover', url: res });
      }
      this.dialogRef = null;
    });
  }
}
