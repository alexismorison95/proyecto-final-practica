import { TestBed } from '@angular/core/testing';

import { GuardChildService } from './guard-child.service';

describe('GuardChildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardChildService = TestBed.get(GuardChildService);
    expect(service).toBeTruthy();
  });
});
