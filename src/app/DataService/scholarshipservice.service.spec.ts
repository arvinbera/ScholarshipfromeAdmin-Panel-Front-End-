import { TestBed } from '@angular/core/testing';

import { ScholarshipserviceService } from './scholarshipservice.service';

describe('ScholarshipserviceService', () => {
  let service: ScholarshipserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScholarshipserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
