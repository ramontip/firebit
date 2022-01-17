import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagPageComponent } from './hashtag-page.component';

describe('HashtagPageComponent', () => {
  let component: HashtagPageComponent;
  let fixture: ComponentFixture<HashtagPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashtagPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
