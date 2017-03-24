import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import * as marked from 'marked';
import * as highlight from 'highlight.js';

interface IMarkdownConfig {
  sanitize?: boolean,
  gfm?: boolean,
  breaks?: boolean,
  smartypants?: boolean
}

@Injectable()
export class MarkdownService {
  private md: MarkedStatic;
  private converted: SafeHtml | string;

  constructor(private sanitizer: DomSanitizer) {
    console.log(123123);
    this.md = marked.setOptions({
      highlight: (code, lang) => {
        return highlight.highlightAuto(code, [lang]).value;
      }
    });
    console.log(234234);
  }

  public setConfig(config: IMarkdownConfig) {
    this.md = marked.setOptions(config);
  }

  public toHtml(markdown: string) {
    if (!markdown) {
      this.converted = '';
    } else {
      this.converted = this.md.parse(markdown);
      console.log(this.md.parse(markdown) as string)
    }
    return this;
  }

  public sanitize() {
    this.converted = this.sanitizer.bypassSecurityTrustHtml(this.converted as string);
    return this;
  }

  public end() {
    return this.converted;
  }

  public convert(markdown: string) {
    return this.toHtml(markdown).sanitize().end() as SafeHtml;
  }
}
