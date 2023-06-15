import { TestBed } from '@angular/core/testing';

import { ComentarioService } from './comentarios.service';

describe('ComentariosService', () => {
  let service: ComentarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
