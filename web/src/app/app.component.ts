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
  isSessionValidated: boolean = false;
  constructor(private userService: UserService, private resource: ResourceService, private ls: LocalStorage) { }

  ngOnInit() {

    // FIXME: https://trello.com/c/1oO1O9TT
    // TODO: https://trello.com/c/uXWnUSOJ
    let authStr = this.ls.getSession();
    if (authStr) {
      const subscription = this.userService.sessionValidated.subscribe(isValidated => {
        this.isSessionValidated = isValidated;
      });
      this.userService.validateSession(Session.constructFromLcStr(authStr));
    }
  }
}
