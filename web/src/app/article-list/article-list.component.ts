import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Subject } from 'rxjs';

import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { Loader } from '../shared/loader';
import { UserService } from '../user.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { ErrorCategory } from '../shared/error';
import { Trusted } from '../shared/constant';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  isVisitor: boolean = true;
  isShowLoginDialog: boolean = false;
  articles: Article[] = [];
  currentArticle: Article;
  isLoading: boolean = false;
  toastSubject: Subject<any>;
  hasMore: boolean = true;
  currentListItemIndex: number;
  loadMoreQuery: any = { pageSize: 10, sortBy: '_id', sortOrder: -1 };
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private subjects: RxSubjectService,
    private sanitizer: DomSanitizer,
    private iconRegistry: MdIconRegistry
  ) {
    iconRegistry.addSvgIcon('comment',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('comment', 'black')));
    iconRegistry.addSvgIcon('like',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('favorite', 'black')));
    iconRegistry.addSvgIcon('forward',
      sanitizer.bypassSecurityTrustResourceUrl(Trusted.icon('forward', 'black')));
  }

  ngOnInit() {
    // this.listArticle();
    // this.toastSubject = this.subjects.toastSubject;
    this.articles = Array.from({ length: 20 }, (v, i) => {
      const title = `这是一篇用于测试的 article[${i}] .`;
      const shortDesc = `这是一篇用于测试的 article[${i}] 的简短描述 ... `;
      const desc = `永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修稧（禊）事也。群贤毕至，少长咸集。
                    此地有崇山峻领（岭），茂林修竹；又有清流激湍，映带左右，引以为流觞曲水，列坐其次。
                    虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。
                    是日也，天朗气清，惠风和畅。仰观宇宙之大，俯察品类之盛。所以游目骋怀，足以极视听之娱，信可乐也。
                    夫人之相与，俯仰一世，或取诸怀抱，晤言一室之内；或因寄所托，放浪形骸之外。
                    虽趣（取/趋）舍万殊，静躁不同，当其欣于所遇，暂得于己，怏然自足，不知老之将至；及其所之既倦，情随事迁，感慨系之矣。
                    向之所欣，俯仰之间，已为陈迹，犹不能不以之兴怀；况修短随化，终期于尽。古人云：“死生亦大矣。”岂不痛哉！
                    每揽（览）昔人兴感之由，若合一契，未尝不临文嗟悼，不能喻之于怀。固知一死生为虚诞，齐彭殇为妄作。
                    后之视今，亦由（犹）今之视昔，悲夫！故列叙时人，录其所述，虽世殊事异，所以兴怀，其致一也。
                    后之揽（览）者，亦将有感于斯文。`
      const coverUrl = 'http://placehold.it/480x270';
      const commentCount = 99;
      const likeCount = 99;
      return { title, shortDesc, desc, coverUrl, commentCount, likeCount } as any;
    });
    this.currentArticle = this.articles[0];
  }

  private scrollLoad(event) {
    if (event.shouldLoad) {
      this.listArticle();
    }
  }

  private listArticle() {
    if (!this.isLoading && this.hasMore) {
      this.isLoading = true;
      this.articleService.listArticle(this.loadMoreQuery).subscribe((res) => {
        this.articles = this.articles.concat(res.articles);
        this.loadMoreQuery.marker = res.marker;
        this.isLoading = false;
        if (this.articles.length === res.totalCount) {
          this.hasMore = false;
        }
      }, (error) => {
        this.toastSubject.next({ id: ErrorCategory.DOCUMENT_NOT_FOUND });
      });
    }
  }
  private chooseArticleByClick(index: number) {
    this.currentArticle = this.articles[index];
  }
}
