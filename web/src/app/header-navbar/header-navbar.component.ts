import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { Trusted } from '../shared/constant';


@Component({
  selector: 'jfb-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit {
  isVisitor: boolean;
  constructor(
    private userService: UserService,
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
    this.isVisitor = this.userService.isVisitor;
  }

  private logout() {
    console.log('123');
    if (!this.userService.isVisitor) {
      this.userService.logout().subscribe(msg => {
        console.log(msg);
      });
    } else {
      this.rxSubjectService.toastSubject.next({ id: 1002 })
    }
  }
}
