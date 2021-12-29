import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitPageComponent } from './bit-page.component';

describe('BitPageComponent', () => {
  let component: BitPageComponent;
  let fixture: ComponentFixture<BitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
