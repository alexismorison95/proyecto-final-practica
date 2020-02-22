import { TestBed } from '@angular/core/testing';

import { AbmsService } from './abms.service';

describe('AbmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbmsService = TestBed.get(AbmsService);
    expect(service).toBeTruthy();
  });
});
