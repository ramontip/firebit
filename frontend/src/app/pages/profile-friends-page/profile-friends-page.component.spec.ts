import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFriendsPageComponent } from './profile-friends-page.component';

describe('ProfileFriendsPageComponent', () => {
  let component: ProfileFriendsPageComponent;
  let fixture: ComponentFixture<ProfileFriendsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFriendsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
