import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jfb-reading-progress-bar',
  templateUrl: './reading-progress-bar.component.html',
  styleUrls: ['./reading-progress-bar.component.css']
})
export class ReadingProgressBarComponent implements OnInit {
  @Input('catalog') catalog: any[];
  _catalog: any[];
  constructor() { }

  ngOnInit() {
    this._catalog = this.catalog.map((catalogItem) => Object.assign({ shouldShowContent: false }, catalogItem));
  }

  private onMouseEnterCatalog(content: string) {
    const index = this._catalog.findIndex((item) => item.content === content);
    console.log(123123);
    if (index > -1) {
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
