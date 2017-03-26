import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jfb-article-archive',
  templateUrl: './article-archive.component.html',
  styleUrls: ['./article-archive.component.scss']
})
export class ArticleArchiveComponent implements OnInit {
  archives: any[];
  constructor() { }

  ngOnInit() {
    this.archives = [
      { _id: 'article-1', title: '这是一片测试文章[1]', createAt: Date.now() - 55 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-2', title: '这是一片测试文章[2]', createAt: Date.now() - 55 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-3', title: '这是一片测试文章[3]', createAt: Date.now() - 50 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-4', title: '这是一片测试文章[4]', createAt: Date.now() - 45 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-5', title: '这是一片测试文章[5]', createAt: Date.now() - 40 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-6', title: '这是一片测试文章[6]', createAt: Date.now() - 35 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-7', title: '这是一片测试文章[7]', createAt: Date.now() - 30 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-8', title: '这是一片测试文章[8]', createAt: Date.now() - 25 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-9', title: '这是一片测试文章[9]', createAt: Date.now() - 20 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-10', title: '这是一片测试文章[10]', createAt: Date.now() - 15 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-11', title: '这是一片测试文章[11]', createAt: Date.now() - 10 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-12', title: '这是一片测试文章[12]', createAt: Date.now() - 5 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-13', title: '这是一片测试文章[13]', createAt: Date.now() - 1 * 60 * 1000, selected: false, seriesLabel: '算法导论题解', },
      { _id: 'article-1', title: '这是一片测试文章[1]', createAt: Date.now() - 55 * 60 * 1000, selected: false, seriesLabel: '爬虫管理框架', },
      { _id: 'article-2', title: '这是一片测试文章[2]', createAt: Date.now() - 55 * 60 * 1000, selected: false, seriesLabel: '爬虫管理框架', },
      { _id: 'article-3', title: '这是一片测试文章[3]', createAt: Date.now() - 50 * 60 * 1000, selected: false, seriesLabel: '爬虫管理框架', },
      { _id: 'article-4', title: '这是一片测试文章[4]', createAt: Date.now() - 45 * 60 * 1000, selected: false, seriesLabel: '爬虫管理框架', },
    ]
  }

}
