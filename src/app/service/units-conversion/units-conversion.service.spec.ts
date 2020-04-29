import { TestBed } from '@angular/core/testing';

import { UnitsConversionService } from './units-conversion.service';

describe('UnitsConversionService', () => {
  let service: UnitsConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
