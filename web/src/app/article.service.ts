import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

import { Article } from './models/article';

@Injectable()
export class ArticleService {
  constructor(private resource: ResourceService) { }

  list(query: Object = {}) {
    return this.resource.get('/article', query).map(res => {
      return res.data
    });
  }

  getArticleById(id: string, query: Object = {}) {
    return this.resource.get('/article/' + id, query).map(res => {
      return new Article(res.data.article);
    });
  }

  updateOrCreate(id: string, article: Article) {
    return this.resource.put('/admin/article' + '/' + id, article);
  }
}
