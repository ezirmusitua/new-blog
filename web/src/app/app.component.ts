import { Component } from '@angular/core';
import { MarkdownService } from './markdown.service';

@Component({
  selector: 'jfb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkdownService]
})
export class AppComponent {}
