import { TestBed } from '@angular/core/testing';

import { FirebaseServiceService } from './FirebaseServiceService';

describe('FirebaseServiceService', () => {
  let service: FirebaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
