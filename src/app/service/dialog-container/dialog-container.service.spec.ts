import { TestBed } from '@angular/core/testing';

import { DialogContainerService } from './dialog-container.service';

describe('DialogContainerService', () => {
  let service: DialogContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
