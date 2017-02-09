import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';

// import environment
const resourceBase = 'http://localhost:3000';

@Injectable()
export class ResourceService {
  customHeaders: Headers = new Headers({
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  });
  resourceBase: string = resourceBase;
  network: number;
  constructor(private http: Http) { }

  public post(path: string, body: Object): Observable<any> {
    // may be do some validation
    return this.http.post(
      this.resourceBase + path,
      JSON.stringify(body),
      { headers: this.customHeaders }
    );
  }

}
