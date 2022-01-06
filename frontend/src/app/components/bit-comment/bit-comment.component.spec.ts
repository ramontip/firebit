import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitCommentComponent } from './bit-comment.component';

describe('BitCommentComponent', () => {
  let component: BitCommentComponent;
  let fixture: ComponentFixture<BitCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
