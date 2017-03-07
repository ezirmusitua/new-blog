import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jfb-reading-progress-bar',
  templateUrl: './reading-progress-bar.component.html',
  styleUrls: ['./reading-progress-bar.component.css']
})
export class ReadingProgressBarComponent implements OnInit {
  @Input('catalog') catalog: any[];
  _catalog: any[] = [];
  constructor() { }

  ngOnInit() {
    for (let index = 0; index < this.catalog.length; index += 1) {
      const catalogItem = this.catalog[index];
      let progress = catalogItem.progress;
      if (index > 0) {
        progress -= this.catalog[index - 1].progress
      }
      this._catalog.push(Object.assign({ shouldShowContent: false }, catalogItem, { progress }));
    }
  }

  private onMouseEnterCatalog(content: string) {
    const index = this._catalog.findIndex((item) => item.content === content);
    console.log(123123);
    if (index > -1 && this._catalog[index].content) {
      this._catalog[index].shouldShowContent = true;
    }
  }
  private onMouseLeaveCatalog(content: string) {
    const index = this.catalog.findIndex((item) => item.content === content);
    if (index > -1) {
      this._catalog[index].shouldShowContent = false;
    }
  }
}
