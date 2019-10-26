import { TestBed } from '@angular/core/testing';

import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProxyService = TestBed.get(ProxyService);
    expect(service).toBeTruthy();
  });

  it ('should get isFollowing from the api', () => {
    const service: ProxyService = TestBed.get(ProxyService);
    service.isFollowing('user', 'follow');
  });
});
