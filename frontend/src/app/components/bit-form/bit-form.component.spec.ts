import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitFormComponent } from './bit-form.component';

describe('BitFormComponent', () => {
  let component: BitFormComponent;
  let fixture: ComponentFixture<BitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
