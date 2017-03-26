import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleArchiveComponent } from './article-archive.component';

describe('ArticleArchiveComponent', () => {
  let component: ArticleArchiveComponent;
  let fixture: ComponentFixture<ArticleArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
