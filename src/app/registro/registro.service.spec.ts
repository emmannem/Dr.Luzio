import { TestBed } from '@angular/core/testing';

import { RegistroAPIService } from './service/RegistroAPI.service';

describe('RegistroService', () => {
  let service: RegistroAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
