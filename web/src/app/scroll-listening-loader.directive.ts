import { Directive, HostListener, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
@Directive({
  selector: '[jfbScrollListeningLoader]'
})
export class ScrollListeningLoaderDirective {
  @Output('scrolled') divScrolled: EventEmitter<any> = new EventEmitter<any>();
  constructor(private el: ElementRef) { }
  @HostListener('scroll')
  onScroll() {
    const nativeEl = this.el.nativeElement;
    const bottomDistance = nativeEl.scrollHeight - nativeEl.scrollTop - nativeEl.offsetHeight;
    this.divScrolled.emit({ shouldLoad: bottomDistance <= 100 && bottomDistance > 50 });
  }
}
