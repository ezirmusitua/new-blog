import { Component, OnInit } from '@angular/core';
import { RxSubjectService } from '../shared/rx-subject.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jfb-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  content: string;
  timeout: number = 1000;
  isShow: boolean = false;
  toastSubscription: Subscription;
  constructor(private subjects: RxSubjectService) { }

  ngOnInit() {
    this.toastSubscription = this.subjects.toastSubject.subscribe((res) => {
      this.content = res.content;
      if (res.timeout) {
        this.timeout = res.timeout;
      }
      this.showToast();
    });
  }

  private showToast() {
    this.isShow = true;
    setTimeout(() => {
      this.isShow = false;
    }, this.timeout);
  }
}
