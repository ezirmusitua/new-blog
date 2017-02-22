import { Observable, Subject } from 'rxjs';
export class Loader<T> {
  _listMethod: any;
  _items: T[] = [];
  _count: number = 0;
  loaderQuery: any = { pageSize: 10, marker: null, sortKey: '_id', sortOrder: -1 };
  constructor(initQuery: Object = {}) {
    this.loaderQuery = Object.assign(this.loaderQuery, initQuery);
  }

  set listMethod(listMethod: (path: string, params?: Object) => Observable<any>) {
    this._listMethod = listMethod;
  }

  get items(): T[] {
    return this._items;
  }

  get count(): number {
    return this._count;
  }

  public replaceQuery(newQuery: Object = {}) {
    this.loaderQuery = newQuery;
  }

  public updateQuery(newQuery: Object = {}) {
    this.loaderQuery = Object.assign(this.loaderQuery, newQuery);
  }

  public resetQuery() {
    this.loaderQuery = { pageSize: 10, marker: null, sortKey: '_id', sortOrder: -1 };
  }

  public load(forceLoad: boolean = false) {
    if (this._items.length !== this._count || forceLoad) {
      return this._listMethod(this.loaderQuery).map((res) => {
        if (res.marker) {
          this.loaderQuery.marker = res.marker;
        }
        this._items = this._items.concat(res.items);
        this._count = res.count;
        return {
          items: res.items,
          count: res.count
        };
      })
    };
  }
}
