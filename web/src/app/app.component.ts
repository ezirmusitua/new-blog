import { Component } from '@angular/core';

@Component({
  selector: 'jfb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  articleList = [{
    title: 'hello world ~ 1',
    updateAt: Date.now(),
    tags: ['h1', 'h2']
  }, {
    title: 'hello world ~ 1',
    updateAt: Date.now(),
    tags: ['h1', 'h2']
  }];
}
