import {inject, TestBed} from '@angular/core/testing';

import {SEOService} from './seoservice.service';

describe('SEOServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SEOService]
    });
  });

  it('should be created', inject([SEOService], (service: SEOService) => {
    expect(service).toBeTruthy();
  }));
});
