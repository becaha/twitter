import { TestBed } from '@angular/core/testing';

import { TwitterSwaggerClientService } from './twitter-swagger-client.service';

describe('TwitterSwaggerClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwitterSwaggerClientService = TestBed.get(TwitterSwaggerClientService);
    expect(service).toBeTruthy();
  });
});
