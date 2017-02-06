import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

class Session {
  userId: string;
  token: string;
  clientCategory: string;
  updateAt: number;

  constructor(body: any) {
    this.userId = body.userId;
    this.token = body.token;
    this.clientCategory = body.clientCategory;
    this.updateAt = body.updateAt;
  }

  public toStorageString(): string {
    return this.token + ';' + this.userId;
  }

  public toAuthString(): string {
    return 'token="' + this.token + '"&user="' + this.userId;
  }
}

const SESSION_KEY = 'ngkoa.blog.session';
const resourcePath = 'http://localhost:3000';
const intervalSeconds = 15 * 60 * 1000;

@Injectable()
export class UserService {
  defaultHeaders: any = {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  };
  sessionActivateInterval: any;
  constructor(private http: Http) { }

  private saveToLocalStorage(session: Session): void {
    localStorage.setItem(SESSION_KEY, session.toStorageString());
  }

  private setAuthHeaders(session: Session): void {
    this.defaultHeaders.Authorization = session.toAuthString();
  }

  private setSessionActivateInterval(): void {
    if (this.sessionActivateInterval) {
      clearInterval(this.sessionActivateInterval);
    }
    setTimeout(() => {
      console.log('start session activate');
      this.sessionActivateInterval = setInterval(() => {
        console.log('interval start');
        this.http.put(
          resourcePath + '/user/activate',
          '',
          { headers: new Headers(this.defaultHeaders) }
        ).subscribe((res) => console.log('activated'));
      }, 1000);
    }, 1000)
  }

  public validateSession(userId: string, token: string): Subscription {
    return this.http.post(
      resourcePath + '/user/alive',
      JSON.stringify({ userId, token }),
      { headers: new Headers(this.defaultHeaders) }
    ).subscribe((res: any) => {
      if (res) {
        this.setAuthHeaders(new Session(res));
        this.setSessionActivateInterval();
      } else {
        // User not login
        localStorage.removeItem(SESSION_KEY);
      }
    });
  }

  public login(email: string, password: string): Observable<void> {
    return this.http.post(
      resourcePath + '/user/login',
      JSON.stringify({ email, password }),
      { headers: new Headers(this.defaultHeaders) }
    ).map((data) => {
      const session = new Session(data.json());
      this.saveToLocalStorage(session);
      this.setAuthHeaders(session);
      this.setSessionActivateInterval();
    });
  }
}
