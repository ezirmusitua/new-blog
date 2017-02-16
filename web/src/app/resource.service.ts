import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ResourceBase, DefaultHeaders, NetworkDelay, NetworkCondition } from './shared/constant';

@Injectable()
export class ResourceService {
  _customHeaders: Headers = new Headers();
  resourceBase: string = ResourceBase;
  _network: number;
  constructor(private http: Http) { }

  set customHeaders(headers: Object) {
    this._customHeaders = new Headers(Object.assign(DefaultHeaders, headers));
  }

  public getHeadersField(name: string): string {
    return this._customHeaders.get(name);
  }

  public get(path, options: Object = {}): Observable<any> {
    console.log(this.resourceBase + path);
    return this.http.get(
      this.resourceBase + path,
      Object.assign({ headers: this._customHeaders }, {})
    );
  }

  public post(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    // may be do some validation
    return this.http.post(
      this.resourceBase + path,
      JSON.stringify(body),
      Object.assign({ headers: this._customHeaders }, {})
    ).map((res: Response) => res.json());
  }

  public put(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    // may be do some validation
    return this.http.post(
      this.resourceBase + path,
      JSON.stringify(body),
      Object.assign({ headers: this._customHeaders }, {})
    );
  }

  public delete(path: string, options: Object = {}): Observable<any> {
    return this.http.delete(
      this.resourceBase + path,
      Object.assign({ headers: this._customHeaders }, {})
    );
  }

  get network(): number {
    return this._network;
  }

  set network(delay: number) {
    if (delay > NetworkDelay.GPRS) {
      this._network = NetworkCondition.GPRS;
    } else if (delay > NetworkDelay.Good2G && delay < NetworkDelay.Regular2G) {
      this._network = NetworkCondition.Regular2G;
    } else if (delay > NetworkDelay.Regular3G && delay < NetworkDelay.Good2G) {
      this._network = NetworkCondition.Good2G;
    } else if (delay > NetworkDelay.Good3G && delay < NetworkDelay.Regular3G) {
      this._network = NetworkCondition.Regular3G;
    } else if (delay > NetworkDelay.Regular4G && delay < NetworkDelay.Good3G) {
      this._network = NetworkCondition.Good3G;
    } else if (delay > NetworkDelay.DSL && delay < NetworkDelay.Regular4G) {
      this._network = NetworkCondition.Regular4G;
    } else if (delay > NetworkDelay.WIFI && delay < NetworkDelay.DSL) {
      this._network = NetworkCondition.DSL;
    } else {
      this._network = NetworkCondition.WIFI;
    }
  }

}
