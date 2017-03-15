import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs';
import { ResourceBase, DefaultHeaders, NetworkDelay, NetworkCondition, ErrorMessage } from './shared/constant';
import { RxSubjectService } from './shared/rx-subject.service';

@Injectable()
export class ResourceService {
  _customHeaders: Headers = new Headers(DefaultHeaders);
  resourceBase: string = ResourceBase;
  _network: number;
  queryEncoder: QueryEncoder = new QueryEncoder();
  constructor(
    private http: Http,
    private subjects: RxSubjectService
  ) {
    console.log(this.resourceBase);
  }

  set customHeaders(headers: Object) {
    this._customHeaders = new Headers(Object.assign(DefaultHeaders, headers));
  }

  private handleServerError(error: Response) {
    return Observable.throw(error.json() || 'Server error'); // Observable.throw() is undefined at runtime using Webpack
  }

  private _constructParams(query: Object = {}) {
    const params = new URLSearchParams();
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        params.set(
          this.queryEncoder.encodeKey(key.toString()),
          this.queryEncoder.encodeValue(query[key])
        );
      }
    }
    return params;
  }

  public getHeadersField(name: string): string {
    return this._customHeaders.get(name);
  }

  public get(path, params: Object = {}, options: Object = {}) {
    return this.http.get(
      this.resourceBase + path,
      Object.assign({
        search: this._constructParams(params),
        headers: this._customHeaders
      }, {})
    ).map((res: Response) => res.json()).catch(this.handleServerError);
  }

  public post(path: string, body: Object = {}, options: Object = {}) {
    // may be do some validation
    return this.http.post(
      this.resourceBase + path,
      JSON.stringify(body),
      Object.assign({ headers: this._customHeaders }, {})
    ).map((res: Response) => {
      return res.json();
    }).catch(this.handleServerError);
  }

  public put(path: string, body: Object = {}, options: Object = {}) {
    // may be do some validation
    return this.http.put(
      this.resourceBase + path,
      JSON.stringify(body),
      Object.assign({ headers: this._customHeaders }, {})
    ).map((res: Response) => res.json()).catch(this.handleServerError);
  }

  public delete(path: string, options: Object = {}) {
    return this.http.delete(
      this.resourceBase + path,
      Object.assign({ headers: this._customHeaders }, {})
    ).map((res: Response) => res.json()).catch(this.handleServerError);
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
