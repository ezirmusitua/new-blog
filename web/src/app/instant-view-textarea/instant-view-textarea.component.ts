import { AfterContentInit, Component, OnInit, ElementRef, Renderer } from '@angular/core';

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
  constructor(
    private markdownService: MarkdownService,
    private elementRef: ElementRef,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const editableDivDom = document.querySelector('#editableDiv')
    const newLineDiv = document.createElement('div');
    newLineDiv.setAttribute('id', 'editing-line');
    newLineDiv.contentEditable = 'true';
    newLineDiv.style.height = '100px';
    newLineDiv.style.backgroundColor = 'blue';
    newLineDiv.style.zIndex = '1';
    newLineDiv.focus();
    setTimeout(() => editableDivDom.appendChild(newLineDiv), 0);
  }

  handleDivInput($event) {
    const editingLine = new ElementRef(this.elementRef.nativeElement.querySelector('#editing-line'));
    this.content = editingLine.nativeElement.innerText;
    if (!this.content) {
      const editableDivRef = new ElementRef(document.querySelector('#editableDiv'));
      this.content = editableDivRef.nativeElement.innerText;
    }

  }
  handleDivKeypress($event) {
    if ($event.keyCode === 13 && this.content) {
      const editableDivRef = new ElementRef(this.elementRef.nativeElement.querySelector('#editableDiv'));
      const editableDivDom = document.querySelector('#editableDiv')
      // remove
      const editingLineNode = document.querySelector('#editing-line');
      editableDivDom.removeChild(editingLineNode);
      // append converted
      const elem = document.createElement('div');
      elem.contentEditable = 'true';
      elem.style.height = '100px';
      elem.style.backgroundColor = 'green';
      elem.style.zIndex = '1';
      elem.innerHTML = this.markdownService.convert(this.content.trim());
      setTimeout(() => editableDivDom.parentNode.appendChild(elem), 0);
      // append new line
      const newLineDiv = document.createElement('div');
      newLineDiv.setAttribute('id', 'editing-line');
      newLineDiv.style.height = '100px';
      newLineDiv.style.backgroundColor = 'blue';
      newLineDiv.focus();
      setTimeout(() => editableDivDom.appendChild(newLineDiv), 0);
      this.content = '';
    }
  }

}
