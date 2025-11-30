import { TestBed } from '@angular/core/testing';

import { Skin } from './skin';

describe('Skin', () => {
  let service: Skin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Skin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
