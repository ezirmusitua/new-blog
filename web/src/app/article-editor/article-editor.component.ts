import { Component, OnInit, Input } from '@angular/core';
import { MarkdownService } from '../markdown.service';

@Component({
  selector: 'jfb-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  data: string = '';
  htmlContent: string = '';

  constructor(private MarkdownService: MarkdownService) { }

  updateHtml () {
    this.htmlContent = this.MarkdownService.convert(this.data);
  }

  ngOnInit() { }

}
