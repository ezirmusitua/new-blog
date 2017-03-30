import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject, Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ResourceService } from './resource.service';
import { LocalStorage } from './localStorage.service';
import { Session } from './models/session';
import { TIME } from './shared/constant';
import { Md5 } from 'ts-md5/dist/md5';

const SESSION_KEY = 'ngkoa.blog.session';

@Injectable()
export class UserService {
  _isVisitor: Subject<boolean> = new Subject<boolean>();
  _sessionValidated: Observable<boolean> = new Observable(observer => observer.next(false));
  sessionActivateInterval: any;
  constructor(
    private resource: ResourceService,
    private ls: LocalStorage
  ) {
  }

  get isVisitor() {
    return this._isVisitor;
  }

  get sessionValidated() {
    return this._sessionValidated;
  }

  private setSessionActivateInterval(): void {
    if (this.sessionActivateInterval) {
      clearInterval(this.sessionActivateInterval);
    }
    setTimeout(() => {
      this.sessionActivateInterval = setInterval(() => {
        this.resource.put('/user/activate').subscribe((res) => console.log('activated'));
      }, 15 * TIME.MINUTE);
    }, 1000);
  }

  public validateSession(session: Session): void {
    this.resource.post(
      '/user/alive',
      session.constructAuthBody()
    ).subscribe((res) => {
      const auth = { Authorization: null } as any;
      if (res) {
        const session = new Session(res);
        auth.Authorization = session.toAuthString();
        this.resource.customHeaders = auth;
        this.setSessionActivateInterval();
        this._isVisitor.next(false);
      } else {
        localStorage.removeItem(SESSION_KEY);
        this.resource.customHeaders = auth;
        this._isVisitor.next(true);
      }
      this._sessionValidated = new Observable<boolean>(observer => {
        observer.next(true);
      })
    });
  }

  public login(email: string, password: string): Observable<void> {
    return this.resource.post(
      '/user/login',
      { email, password: Md5.hashStr(password) }
    ).map((data) => {
      const session = new Session(data);
      this.resource.customHeaders = { Authorization: session.toAuthString() };
      this.ls.setSession(session);
      this.setSessionActivateInterval();
      this._isVisitor.next(true);
    });
  }

  public logout() {
    return this.resource.delete('/user/logout').map((res) => {
      this.resource.customHeaders = { Authorization: null };
      this.ls.removeSession();
      clearInterval(this.sessionActivateInterval);
      this._isVisitor.next(true);
      return 'logout success';
    })
  }
}
