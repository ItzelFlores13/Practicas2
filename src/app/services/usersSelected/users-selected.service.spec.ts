import { TestBed } from '@angular/core/testing';

import { UsersSelectedService } from './users-selected.service';

describe('UsersSelectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersSelectedService = TestBed.get(UsersSelectedService);
    expect(service).toBeTruthy();
  });
});
