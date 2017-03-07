import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RxSubjectService {
  _floatingNavBtnSubject: Subject<any> = new Subject<any>();
  _toastSubject: Subject<any> = new Subject<any>();
  constructor() { };

  get floatingNavBtnSubject() {
    return this._floatingNavBtnSubject;
  }

  get toastSubject() {
    return this._toastSubject;
  }
}
