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
  currentTag: { name: string; prev: string; value: string; isTagCharEnd: boolean } = { name: '', prev: '', value: '', isTagCharEnd: false };
  currentTagStack: string;
  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
  }

  inputMarkdownContent($event) {
    this.content = $event.target.textContent
    const last = $event.target.textContent.length - 1;
    const currentChar = $event.target.textContent.charAt(last);
    if (currentChar === ' ' && /h\d/gi.test(this.currentTag.name) && !this.currentTag.isTagCharEnd) {
      this.currentTag.isTagCharEnd = true;
    }
    if (currentChar === '#' && !this.currentTag.isTagCharEnd) {
      if (/h\d/gi.test(this.currentTag.name)) {
        const nextHLevel = parseInt(/h(\d)/.exec(this.currentTag.name)[1], 10) + 1;
        this.currentTag.name = 'h' + nextHLevel.toString();
        this.currentTag.value = '<h' + nextHLevel.toString() + '>';
      }
    }
    console.log(this.content);
  }

}
