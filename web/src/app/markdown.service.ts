import { Injectable } from '@angular/core';
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

  constructor() {
    this.md = marked.setOptions({
      highlight: (code, lang) => {
        return highlight.highlightAuto(code, [lang]).value;
      }
    });
  }

  setConfig(config: IMarkdownConfig) {
    this.md = marked.setOptions(config);
  }

  convert(markdown: string): string {
    if (!markdown) {
      return '';
    }
    return this.md.parse(markdown);
  }
}
