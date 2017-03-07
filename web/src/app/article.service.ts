import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

import { Article } from './models/article';

@Injectable()
export class ArticleService {
  constructor(private resource: ResourceService) { }

  private _loaderListMethod(query: Object = {}) {
    return this.resource.get('/article', query);
  }

  get loaderListMethod() {
    return this._loaderListMethod;
  }

  listArticle(query: Object = {}) {
    return this.resource.get('/article', query).map(res => {
      return {
        marker: res.marker || null,
        totalCount: res.count,
        articles: res.items.map(article => new Article(article)),
      }
    });
  }

  getArticleById(id: string) {
    return this.resource.get('/article/' + id).map(res => new Article(res));
  }

  save(id: string, article: Article) {
    if (id) {
      return this.resource.put('/admin/article' + '/' + id, article);
    } else {
      return this.resource.post('/admin/article', article).map(res => new Article(res));
    }
  }
}
