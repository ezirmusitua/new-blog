import { Component, OnInit } from '@angular/core';

import { UserService, Session } from './user.service';
import { MarkdownService } from './markdown.service';

const SESSION_KEY = 'ngkoa.blog.session';

@Component({
  selector: 'jfb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkdownService]
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit() {
    const authStr = localStorage.getItem(SESSION_KEY);
    if (authStr) {
      const start = Date.now();
      this.userService.validateSession(Session.constructFromLcStr(authStr)).subscribe((res) => {
        const end = Date.now();
        this.userService.setNetWorkFromDelay(end - start);
      });
    }
  }
}
