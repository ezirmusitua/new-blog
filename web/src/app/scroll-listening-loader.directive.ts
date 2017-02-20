import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[jfbScrollListeningLoader]'
})
export class ScrollListeningLoaderDirective {
  @Input() loadMore: () => void;
  constructor(private el: ElementRef) { }
  @HostListener('scroll') onscroll() {
    console.log(this.el.nativeElement.scrollHeight)
    this.loadMore();
  }
}
