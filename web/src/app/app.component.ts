import { Component, OnInit } from '@angular/core';

import { Session } from './models/session';
import { UserService } from './user.service';
import { ResourceService } from './resource.service';
import { LocalStorage } from './localStorage.service';
import { MarkdownService } from './markdown.service';

const SESSION_KEY = 'ngkoa.blog.session';

@Component({
  selector: 'jfb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkdownService]
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private resource: ResourceService, private ls: LocalStorage) { }

  ngOnInit() {

    // FIXME: https://trello.com/c/1oO1O9TT
    // TODO: https://trello.com/c/uXWnUSOJ
    let authStr = this.ls.getSession();
    if (authStr) {
      const start = Date.now();
      this.userService.validateSession(Session.constructFromLcStr(authStr)).subscribe((res) => {
        const end = Date.now();
        this.resource.network = end - start;
      });
    }
  }
}
