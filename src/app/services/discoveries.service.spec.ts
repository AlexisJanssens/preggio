import { TestBed } from '@angular/core/testing';

import { DiscoveriesService } from './discoveries.service';

describe('DiscoveriesService', () => {
  let service: DiscoveriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoveriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
