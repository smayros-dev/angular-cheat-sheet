import { TestBed } from '@angular/core/testing';

import { Session } from './session.service';

describe('Session', () => {
  let session: Session;

  beforeEach(() => {
    session = TestBed.inject(Session);
  });

  it('starts logged out and logs in', () => {
    expect(session.isLoggedIn()).toBe(false);

    session.login();

    expect(session.isLoggedIn()).toBe(true);
  });

  it('returns to logged out after a logout', () => {
    session.login();
    expect(session.isLoggedIn()).toBe(true);

    session.logout();

    expect(session.isLoggedIn()).toBe(false);
  });
});
