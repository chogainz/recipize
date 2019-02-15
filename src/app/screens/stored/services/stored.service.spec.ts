import { TestBed } from '@angular/core/testing';

import { StoredService } from './stored.service';

describe('StoredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoredService = TestBed.get(StoredService);
    expect(service).toBeTruthy();
  });
});
