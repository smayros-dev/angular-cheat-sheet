import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, provideRouter } from '@angular/router';

import { SessionService } from './services/session.service';
import { canActivateTasks, taskRoutes } from './task.routes';

describe('canActivateTasks', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;
  let session: SessionService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(taskRoutes)],
    });

    session = TestBed.inject(SessionService);
    router = TestBed.inject(Router);
  });

  it('redirects logged-out users to the login UrlTree', () => {
    const result = TestBed.runInInjectionContext(() => canActivateTasks(route, state));

    expect(result).toEqual(router.parseUrl('/login'));
  });

  it('allows activation when logged in', () => {
    session.login();

    const result = TestBed.runInInjectionContext(() => canActivateTasks(route, state));

    expect(result).toBeTrue();
  });
});
