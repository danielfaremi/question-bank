import { TestBed } from '@angular/core/testing';

import { LayersGuard } from './layers.guard';

describe('LayersGuard', () => {
  let guard: LayersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LayersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
