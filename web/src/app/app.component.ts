import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
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
    const sessionStr = localStorage.getItem(SESSION_KEY);
    console.log(sessionStr)
    if (sessionStr) {
      const [token, userId] = sessionStr.match(/(\w+);(\w+)/).slice(1, 3);
      console.log(token, userId);
      this.userService.validateSession(userId, token);
    }
  }
}
