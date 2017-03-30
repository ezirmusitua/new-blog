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
import { Trusted, TIME } from '../shared/constant';
import { ErrorCategory } from '../shared/error';

interface SelectedArticleIndex { folderIndex: string; articleIndex: number };

const getSelectedItem = (folder: any, selected: SelectedArticleIndex) => {
  return folder[selected.folderIndex].articles[selected.articleIndex];
};

@Component({
  selector: 'jfb-article-editor',
  entryComponents: [
    CoverDescriptionEdit,
  ],
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  // dialogRef: MdDialogRef<CoverDescriptionEdit>;
  editorCategory: number = 100;
  folderItems: any[] = [];
  selected: SelectedArticleIndex;
  article: Article;
  uploadedImages: any[] = [];
  dialogRef: MdDialogRef<any>;

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
        ariaLabel: `uploaded-image-${i}`,
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

  public openDialog(category) {
    this.dialogRef = this.dialog.open(CoverDescriptionEdit);

    // this.dialogRef.afterClosed().subscribe(result => {
    //   console.log('result: ' + result);
    //   this.dialogRef = null;
    // });
  }
}
