import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesCommentedComponent } from './activities-commented.component';

describe('ActivitiesCommentedComponent', () => {
  let component: ActivitiesCommentedComponent;
  let fixture: ComponentFixture<ActivitiesCommentedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesCommentedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesCommentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
