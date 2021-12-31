import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendsPageComponent } from './user-friends-page.component';

describe('UserFriendsPageComponent', () => {
  let component: UserFriendsPageComponent;
  let fixture: ComponentFixture<UserFriendsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFriendsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
