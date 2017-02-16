import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

import { Article } from './models/article';

@Injectable()
export class ArticleService {
  base: string = '/article'
  constructor(private resource: ResourceService) { }

  getArticleById(id: string) {
    return this.resource.get(this.base + '/' + id).map(res => new Article(res.json()));
  }

  save(id: string, article: Article) {
    if (id) {
      console.log(id);
      return this.resource.put(this.base + '/' + id, article).map(res => new Article(res.json()));
    } else {
      return this.resource.post(this.base, article).map(res => new Article(res.json()));
    }
  }
}
