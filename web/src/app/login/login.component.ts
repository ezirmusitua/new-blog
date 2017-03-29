import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { ErrorCategory } from '../shared/error';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  private login() {
    this.userService.uniqLogin(this.email, this.password).subscribe(res => {
      this.router.navigate(['/']);
    }, (error) => {
      this.subjects.toastSubject.next({ id: ErrorCategory.DOCUMENT_NOT_FOUND });
    });
  }

}
