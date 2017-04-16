import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Session } from '../models/session';
import { LocalStorage } from '../localStorage.service';
import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { ErrorCategory } from '../shared/error';

@Component({
  selector: 'jfb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private userService: UserService,
    private subjects: RxSubjectService,
    private ls: LocalStorage,
    private router: Router
  ) { }

  ngOnInit() {
    let authStr = this.ls.getSession();
    if (authStr) {
      this.userService.validateSession(Session.constructFromLcStr(authStr));
    }

  }

  public login() {
    this.userService.login(this.email, this.password).subscribe(res => {
      this.router.navigate(['/']);
    }, (error) => {
      this.subjects.toastSubject.next({ id: ErrorCategory.DOCUMENT_NOT_FOUND });
    });
  }

}
