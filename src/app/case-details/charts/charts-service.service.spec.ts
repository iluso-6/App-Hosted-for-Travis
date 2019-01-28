import { TestBed } from '@angular/core/testing';

import { ChartsServiceService } from './charts-service.service';

describe('ChartsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartsServiceService = TestBed.get(ChartsServiceService);
    expect(service).toBeTruthy();
  });
});
