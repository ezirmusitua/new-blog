import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantViewTextareaComponent } from './instant-view-textarea.component';

describe('InstantViewTextareaComponent', () => {
  let component: InstantViewTextareaComponent;
  let fixture: ComponentFixture<InstantViewTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantViewTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantViewTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
