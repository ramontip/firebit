import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitEditComponent } from './bit-edit.component';

describe('BitEditComponent', () => {
  let component: BitEditComponent;
  let fixture: ComponentFixture<BitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
