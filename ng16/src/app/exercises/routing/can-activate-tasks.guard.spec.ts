import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, provideRouter } from '@angular/router';

import { canActivateTasks } from './can-activate-tasks.guard';
import { Session } from './session.service';

describe('canActivateTasks', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;
  let session: Session;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    session = TestBed.inject(Session);
    router = TestBed.inject(Router);
  });

  it('sends logged-out users to /login and allows them in after login', () => {
    const loggedOut = TestBed.runInInjectionContext(() => canActivateTasks(route, state));
    expect(loggedOut).toEqual(router.parseUrl('/login'));

    session.login();

    const loggedIn = TestBed.runInInjectionContext(() => canActivateTasks(route, state));
    expect(loggedIn).toBe(true);
  });

  it('allows activation when the user is logged in', () => {
    session.login();

    const result = TestBed.runInInjectionContext(() => canActivateTasks(route, state));

    expect(result).toBe(true);
  });
});
