import { TestBed } from '@angular/core/testing';

import { BitService } from './bit.service';

describe('BitService', () => {
  let service: BitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
