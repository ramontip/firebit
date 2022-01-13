import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesLikedComponent } from './activities-liked.component';

describe('ActivitiesLikedComponent', () => {
  let component: ActivitiesLikedComponent;
  let fixture: ComponentFixture<ActivitiesLikedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesLikedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
