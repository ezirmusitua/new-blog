import { Component, OnInit, Input } from '@angular/core';

import { TIME } from '../shared/constant';

const MonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const calcTimeLabel = (leftTime: number, rightTime: number = Date.now()) => {
  const [leftDate, rightDate] = [new Date(leftTime), new Date(rightTime)];
  const timeDelta = rightTime - leftTime;
  if (timeDelta > 6 * TIME.MONTH) return leftDate.getFullYear().toLocaleString();
  if (timeDelta > 1 * TIME.MONTH && timeDelta <= 6 * TIME.MONTH) {
    return MonthNames[leftDate.getMonth()] + ' ~ ' + MonthNames[leftDate.getMonth() + 6];
  }
  if (timeDelta > 1 * TIME.WEEK && timeDelta <= 1 * TIME.MONTH) return MonthNames[leftDate.getMonth()];
  if (timeDelta > 3 * TIME.DAY && timeDelta <= 1 * TIME.WEEK) return 'Weekly';
  if (timeDelta > 1 * TIME.DAY && timeDelta <= 3 * TIME.DAY) return 'Three days';
  if (timeDelta <= 1 * TIME.DAY) return 'Today';
};

const groupArticleByBelongToLabel = (articles) => {
  const articleBelongToLabelMap = articles.reduce((group, archive) => {
    console.log(archive.belongToLabel);
    const belongToLabel = archive.belongToLabel || '未分类';
    if (belongToLabel in group) {
      const series = group[belongToLabel];
      series.articles.push(archive);
      series.createAt = series.createAt > archive.createAt ? archive.createAt : series.createAt;
    } else {
      group[belongToLabel] = {};
      group[belongToLabel].articles = [archive];
      group[belongToLabel].createAt = archive.createAt;
      group[belongToLabel].title = belongToLabel;
    }
    return group;
  }, {});
  const archives = [];
  for (const belongToLabel in articleBelongToLabelMap) {
    if (articleBelongToLabelMap.hasOwnProperty(belongToLabel)) {
      const series = articleBelongToLabelMap[belongToLabel];
      archives.push(series);
    }
  }
  return archives;
}

@Component({
  selector: 'archive-list',
  template: `
  <md-list>
    <div md-list-item *ngFor="let item of groupedArchives" class="archive-item">
      <a class="article-link" *ngIf="!item.articles || !item.articles.length">item.title</a>
      <md-list class="archive-list" *ngIf="item.articles && item.articles.length">
        <h3 class="archive-label">{{item.title}}</h3>
        <md-list>
          <div fxLayout="row" fxLayoutAlign="end center" class="article-link-container" md-list-item *ngFor="let article of item.articles">
            <a [routerLink]="['/article', article._id.toString()]" fxFlex>{{article.title}}</a>
            <span fxFlex>{{ article.updateAt | date:'short'}}</span>
          </div>
        </md-list>
      </md-list>
    </div>
  </md-list>
  `,
  styleUrls: ['./archive-list.component.scss']
})
export class ArchiveListComponent implements OnInit {
  @Input() archives: any[];
  @Input() archiveCategory: number;
  groupedArchives: any[] = [];

  constructor() { }
  ngOnInit() {
    // archive by series
    if (this.archiveCategory === 100) {
      this.groupedArchives = groupArticleByBelongToLabel(this.archives)
    }
    // archive by time
    if (this.archiveCategory === 200) {
      const archivesWithTimeStr = this.archives.reduce((res, archive) => {
        const timeLabel = calcTimeLabel(archive.updateAt);
        console.log(Object.assign({}, archive, { belongToLabel: timeLabel }))
        return res.concat([Object.assign({}, archive, { belongToLabel: timeLabel })]);
      }, []);
      this.groupedArchives = groupArticleByBelongToLabel(archivesWithTimeStr);
    }
  }
}
