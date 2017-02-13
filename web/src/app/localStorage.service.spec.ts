/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStorage } from './localStorage.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorage]
    });
  });

  it('should ...', inject([LocalStorage], (service: LocalStorage) => {
    expect(service).toBeTruthy();
  }));
});
