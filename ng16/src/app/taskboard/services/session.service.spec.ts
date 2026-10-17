import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    service = TestBed.inject(SessionService);
  });

  it('starts logged out', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('logs in', () => {
    service.login();

    expect(service.isLoggedIn()).toBeTrue();
  });

  it('logs out', () => {
    service.login();
    service.logout();

    expect(service.isLoggedIn()).toBeFalse();
  });
});
