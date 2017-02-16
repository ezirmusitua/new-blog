import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';

import { Article } from './models/article';

@Injectable()
export class ArticleService {
  base: string = '/article'
  constructor(private resource: ResourceService) { }

  getArticleById(id: string) {
    return this.resource.get(this.base + '/' + id).map((res) => new Article(res.json()));
  }
}
