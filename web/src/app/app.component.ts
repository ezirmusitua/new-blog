import { Component, OnInit } from '@angular/core';

import { MarkdownService } from './markdown.service';

const SESSION_KEY = 'ngkoa.blog.session';

@Component({
  selector: 'jfb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MarkdownService]
})
export class AppComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
  }
}
