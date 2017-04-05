import { Component, OnInit } from '@angular/core';

import { MarkdownService } from '../markdown.service';

const MarkdownSpecialChar = [
  '#', '!', '`', '*', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

@Component({
  selector: 'jfb-instant-view-textarea',
  templateUrl: './instant-view-textarea.component.html',
  styleUrls: ['./instant-view-textarea.component.scss']
})
export class InstantViewTextareaComponent implements OnInit {
  content: string = '';
  htmlContent: string = '';
  currentTag: { name: string; prev: string; value: string; isTagCharEnd: boolean } = { name: '', prev: '', value: '', isTagCharEnd: false };
  currentTagStack: string;
  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
  }

  inputMarkdownContent($event) {
    this.content = $event.target.textContent
    this.htmlContent = this.markdownService.convert(this.content);
  }

}
