import { Directive, HostListener, Input, ElementRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
@Directive({
  selector: '[jfbScrollListeningLoader]'
})
export class ScrollListeningLoaderDirective {
  @Input() observable: BehaSubject<any>;
  constructor(private el: ElementRef) { }
  @HostListener('scroll') onscroll() {
    console.log(this.el.nativeElement.scrollHeight);
    // FIXME: check scroll height to set need to load
    this.observable.onNex
  }
}
