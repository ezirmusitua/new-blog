import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

import { Article } from './models/article';

@Injectable()
export class ArticleService {
  visitorbase: string = '/article'
  constructor(private resource: ResourceService) { }

  listArticleForVisitor() {
    return this.resource.get('/article').map(res => res.json()).map(res => ({
      totalCount: res.count,
      articles: res.items.map(article => new Article(article)),
    }));
  }

  listArticleForAdmin(query) {
    return this.resource.get('/article', query).map(res => res.json()).map(res => ({
      totalCount: res.count,
      articles: res.items.map(article => new Article(article)),
    }));
  }

  getArticleById(id: string) {
    return this.resource.get('/article/' + id).map(res => new Article(res.json()));
  }

  save(id: string, article: Article) {
    if (id) {
      return this.resource.put('/admin/article' + '/' + id, article).map(res => new Article(res));
    } else {
      return this.resource.post('/admin/article', article).map(res => new Article(res));
    }
  }
}
