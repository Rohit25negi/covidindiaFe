import { TestBed } from '@angular/core/testing';

import { CoviddataserviceService } from './coviddataservice.service';

describe('CoviddataserviceService', () => {
  let service: CoviddataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoviddataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
