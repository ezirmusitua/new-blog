import { Injectable } from '@angular/core';

@Injectable()
export class ArticleService {
  constructor() { }
  
  getArticleById (id: any) {
    return {data: {title: 'hello world', markdownContent: '__i__', htmlContent: '<i>i</i>', createBy: 'jferroal', createAt: 1484653482441}};
  }
}
