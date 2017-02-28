import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'jfb-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(0.3, 0.3, 0.3)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'scale3d(.3, .3, .3)' }))
      ])
    ])
  ]
})
export class ModalDialogComponent implements OnInit {
  visible: boolean = false;
  floatingNavSubscription: Subscription;
  password: string = '';
  constructor(
    private userService: UserService,
    private subjects: RxSubjectService,
  ) { }

  ngOnInit() {
    this.floatingNavSubscription = this.subjects.floatingNavBtnSubject.subscribe(() => {
      this.visible = true;
    });
  }

  close() {
    this.visible = false;
  }

  login() {
    const email = 'jferroal@gmail.com';
    const password = '123456';
    this.userService.uniqLogin(email, password);
    this.password = '';
    this.visible = false;
  }
}
