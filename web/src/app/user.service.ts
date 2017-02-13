import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ResourceService } from './resource.service';
import { LocalStorage } from './localStorage.service';
import { Session } from './models/session';
import { TIME } from './shared/constant';

const SESSION_KEY = 'ngkoa.blog.session';

@Injectable()
export class UserService {
  defaultHeaders: any = {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  };
  _isVisitor: boolean = true;
  netWork: number;
  sessionActivateInterval: any;
  constructor(private resouce: ResourceService, private ls: LocalStorage) {
  }

  get isVisitor(): boolean {
    return this._isVisitor;
  }

  private setSessionActivateInterval(): void {
    if (this.sessionActivateInterval) {
      clearInterval(this.sessionActivateInterval);
    }
    setTimeout(() => {
      this.sessionActivateInterval = setInterval(() => {
        this.resouce.put('/user/activate').subscribe((res) => console.log('activated'));
      }, 15 * TIME.MINUTE);
    }, 1000)
  }

  public validateSession(session: Session): Observable<{ isAlive: boolean }> {
    return this.resouce.post(
      '/user/alive',
      JSON.stringify(session.constructAuthBody())
    ).map((res: Response) => {
      const auth = { Authorization: null } as any;
      if (res) {
        const session = new Session(res.json());
        auth.Authorization = session.toAuthString();
        this.resouce.customHeaders = auth;
        this.setSessionActivateInterval();
        this._isVisitor = false;
      } else {
        localStorage.removeItem(SESSION_KEY);
        this.resouce.customHeaders = auth;
        this._isVisitor = true;
      }
      return { isAlive: !this._isVisitor };
    });
  }

  public login(email: string, password: string): Observable<void> {
    return this.resouce.post(
      '/user/login',
      JSON.stringify({ email, password }),
      { headers: new Headers(this.defaultHeaders) }
    ).map((data) => {
      const session = new Session(data.json());
      this.resouce.customHeaders = { Authorization: session.toAuthString() };
      this.ls.setSession(session);
      this.setSessionActivateInterval();
      this._isVisitor = false;
    });
  }

  public uniqLogin(email: string, password: string): Subscription {
    const currentAuthHeader = this.defaultHeaders.Authorization;
    if (!this._isVisitor) {
      return this.validateSession(Session.constructFromHeader(currentAuthHeader)).subscribe((res) => {
        if (!res.isAlive) {
          this.login(email, password).subscribe();
        }
      });
    } else {
      return this.login(email, password).subscribe();
    }
  }

  public logout() {
    this.resouce.delete('/user/logout').subscribe(() => {
      this.resouce.customHeaders = { Authorization: null };
      this.ls.removeSession();
      this._isVisitor = true;
      clearInterval(this.sessionActivateInterval);
    })
  }
}
