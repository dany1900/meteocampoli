import { TestBed, inject } from '@angular/core/testing';

import { SEOServiceService } from './seoservice.service';

describe('SEOServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SEOServiceService]
    });
  });

  it('should be created', inject([SEOServiceService], (service: SEOServiceService) => {
    expect(service).toBeTruthy();
  }));
});
