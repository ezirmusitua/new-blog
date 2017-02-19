import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

import { Article } from './models/article';

@Injectable()
export class ArticleService {
  visitorbase: string = '/article'
  constructor(private resource: ResourceService) { }

  listArticleForVisitor() {
    return this.resource.get('/article').map(res => {
      console.log(res);
      return {
        totalCount: res.count,
        articles: res.items.map(article => new Article(article)),
      }
    });
  }

  listArticleForAdmin(query) {
    return this.resource.get('/article', query).map(res => ({
      totalCount: res.count,
      articles: res.items.map(article => new Article(article)),
    }));
  }

  getArticleById(id: string) {
    return this.resource.get('/article/' + id).map(res => new Article(res));
  }

  save(id: string, article: Article) {
    if (id) {
      return this.resource.put('/admin/article' + '/' + id, article).map(res => {
        console.log(res);
        return new Article(res)
      });
    } else {
      return this.resource.post('/admin/article', article).map(res => new Article(res));
    }
  }
}
