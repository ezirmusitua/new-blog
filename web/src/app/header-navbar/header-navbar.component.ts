import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { Session } from '../models/session';
import { UserService } from '../user.service';
import { LocalStorage } from '../localStorage.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { Trusted } from '../shared/constant';


@Component({
  selector: 'jfb-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit {
  isVisitor: boolean = true;
  constructor(
    private userService: UserService,
    private ls: LocalStorage,
    private rxSubjectService: RxSubjectService,
    private sanitizer: DomSanitizer,
    private iconRegistry: MdIconRegistry
  ) {
    iconRegistry.addSvgIcon('more_vert',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('more_vert')));
    iconRegistry.addSvgIcon('home',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('home')));
    iconRegistry.addSvgIcon('archive',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('folder_special')));
  }

  ngOnInit() {
    let authStr = this.ls.getSession();
    if (authStr) {
      this.userService.validateSession(Session.constructFromLcStr(authStr));
    }
    this.userService.isVisitor.subscribe(isVisitor => {
      this.isVisitor = isVisitor;
    });
  }

  private logout() {
    if (!this.isVisitor) {
      this.userService.logout().subscribe(msg => {
        console.log(msg);
      });
    } else {
      this.rxSubjectService.toastSubject.next({ id: 1002 })
    }
  }
}
