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
  editableDivRef: ElementRef;
  editableDivDom: Node;
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
    this.editableDivRef = new ElementRef(this.elementRef.nativeElement.querySelector('#editableDiv'));
    this.editableDivDom = document.querySelector('#editableDiv')
  }

  handleDivInput($event) {
    const lastChild = new ElementRef(this.editableDivRef.nativeElement.lastElementChild);
    if (!lastChild.nativeElement && this.editableDivRef.nativeElement.innerText) {
      this.content = this.editableDivRef.nativeElement.innerText;
    } else if (lastChild.nativeElement.nodeName === 'DIV') {
      this.content = lastChild.nativeElement.innerText;
    }
  }
  handleDivKeypress($event) {
    if ($event.keyCode === 13 && this.content) {
      // remove
      const childCount = this.editableDivDom.childNodes.length;
      const lastChild = this.editableDivDom.childNodes[childCount - 1];
      this.editableDivDom.removeChild(lastChild);
      // append
      const elem = document.createElement('div');
      elem.innerHTML = this.markdownService.convert(this.content);
      this.editableDivDom.appendChild(elem);
    }
  }

}
