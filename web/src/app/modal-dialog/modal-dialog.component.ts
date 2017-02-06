import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import { UserService } from '../user.service';

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
  @Input() closable: boolean = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  password: string = '';
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  login() {
    const email = 'jferroal@gmail.com';
    const password = '123456';
    this.userService.login(email, password).subscribe((res) => {
    });
    this.password = '';
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }  
}
