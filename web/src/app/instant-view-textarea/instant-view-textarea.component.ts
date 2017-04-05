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
  editableDiv: ElementRef;
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
    this.editableDiv = new ElementRef(this.elementRef.nativeElement.querySelector('#editableDiv'));
  }

  handleDivInput($event) {
    // console.log(this.editableDiv);
    const lastChild = new ElementRef(this.editableDiv.nativeElement.lastElementChild);
    // const inputingElem = this.editableDiv.nativeElement.
    this.content = lastChild.nativeElement.innerText;
  }
  handleDivKeypress($event) {
    if ($event.keyCode === 13) {
      console.log(this.content);
      this.editableDiv.nativeElement.appendChild(this.markdownService.convert(this.content));
    }
  }

}
