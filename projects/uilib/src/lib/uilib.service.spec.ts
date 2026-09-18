import { TestBed } from '@angular/core/testing';

import { UilibService } from './uilib.service';

describe('UilibService', () => {
  let service: UilibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UilibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
