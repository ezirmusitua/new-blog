import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const NetWorkCondition = {
  GPRS: 500, // GPRS
  Regular2G: 200, // Regular 2G
  Good2G: 150, // Good 2G
  Regular3G: 100, // Regular 3G
  Good3G: 40,  // Good 3G
  Regular4G: 20,  // Regular 4G
  DSL: 5,   // DSL
  WIFI: 2    // WIFI
};

export class Session {
  private userId: string;
  private token: string;
  private clientCategory: string;
  private updateAt: number;

  constructor(body: any) {
    this.userId = body.userId;
    this.token = body.token;
    this.clientCategory = body.clientCategory;
    this.updateAt = body.updateAt;
  }

  public constructAuthBody(): Object {
    return { userId: this.userId, token: this.token };
  }
  public toStorageString(): string {
    return this.token + ';' + this.userId;
  }

  public toAuthString(): string {
    return 'token="' + this.token + '"&user="' + this.userId + '"';
  }

  public static constructFromLcStr(authStr: string): Session {
    const [token, userId] = authStr.match(/(\w+);(\w+)/).slice(1, 3);
    return new Session({ userId, token });
  }

  public static constructFromHeader(authStr: string): Session {
    const [token, userId] = authStr.match(/token="(\w+)"&user="(\w+)"/).slice(1, 3);
    return new Session({ userId, token });
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
  isVisitor: boolean = true;
  netWork: number;
  sessionActivateInterval: any;
  constructor(private http: Http) {
  }

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
      this.sessionActivateInterval = setInterval(() => {
        this.http.put(
          resourcePath + '/user/activate',
          '',
          { headers: new Headers(this.defaultHeaders) }
        ).subscribe((res) => console.log('activated'));
      }, intervalSeconds);
    }, 1000)
  }

  public validateSession(session: Session): Observable<{ isAlive: boolean }> {
    return this.http.post(
      resourcePath + '/user/alive',
      JSON.stringify(session.constructAuthBody()),
      { headers: new Headers(this.defaultHeaders) }
    ).map((res: Response) => {
      if (res) {
        this.setAuthHeaders(new Session(res.json()));
        this.setSessionActivateInterval();
        this.isVisitor = false;
      } else {
        localStorage.removeItem(SESSION_KEY);
        delete this.defaultHeaders.Authorization;
        this.isVisitor = true;
      }
      return { isAlive: !this.isVisitor };
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
      this.isVisitor = false;
    });
  }

  public uniqLogin(email: string, password: string): Subscription {
    const currentAuthHeader = this.defaultHeaders.Authorization;
    if (currentAuthHeader) {
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
    this.http.delete(
      resourcePath + '/user/logout',
      { headers: new Headers(this.defaultHeaders) }
    ).subscribe(() => {
      delete this.defaultHeaders.Authorization;
      localStorage.removeItem(SESSION_KEY);
      this.isVisitor = true;
      clearInterval(this.sessionActivateInterval);
    })
  }

  public setNetWorkFromDelay(delay: number): void {
    if (delay > NetWorkCondition.GPRS) {
      this.netWork = 100;
    } else if (delay > NetWorkCondition.Good2G && delay < NetWorkCondition.Regular2G) {
      this.netWork = 200;
    } else if (delay > NetWorkCondition.Regular3G && delay < NetWorkCondition.Good2G) {
      this.netWork = 300;
    } else if (delay > NetWorkCondition.Good3G && delay < NetWorkCondition.Regular3G) {
      this.netWork = 400;
    } else if (delay > NetWorkCondition.Regular4G && delay < NetWorkCondition.Good3G) {
      this.netWork = 500;
    } else if (delay > NetWorkCondition.DSL && delay < NetWorkCondition.Regular4G) {
      this.netWork = 600;
    } else if (delay > NetWorkCondition.WIFI && delay < NetWorkCondition.DSL) {
      this.netWork = 700;
    } else {
      this.netWork = 800;
    }
  }
}
