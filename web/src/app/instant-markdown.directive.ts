import { Directive, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[jfbInstantMarkdown]'
})
export class InstantMarkdownDirective {
  @Input() markdownContent: string;
  @Output() markdownContentChange: EventEmmiter<any>;
  constructor(private el: ElementRef) { }

  @HostListener('change')
  onChange(event) {
    console.log(event)
    this.highlight('yellow');
  }

  @HostListener('blur')
  onBlur() {
    console.log(123)
    this.highlight('green');
  }

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
