import {TestBed} from '@angular/core/testing';

import {UtiliyService} from './utiliy.service';

describe('UtiliyService', () => {
  let service: UtiliyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtiliyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
