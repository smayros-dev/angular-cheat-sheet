import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { TaskListComponent } from '../components/task-list.component';
import { LoginComponent } from './login.component';
import { Session } from './session.service';
import { taskRoutes } from './task.routes';

describe('taskRoutes', () => {
  let router: Router;
  let session: Session;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(taskRoutes)],
    });

    router = TestBed.inject(Router);
    session = TestBed.inject(Session);
  });

  it('redirects a logged-out navigation to /login and reaches the tasks view after login', async () => {
    const harness = await RouterTestingHarness.create('/tasks');

    expect(router.url).toBe('/login');
    expect(harness.routeDebugElement?.componentInstance instanceof LoginComponent).toBe(true);

    session.login();

    await harness.navigateByUrl('/tasks', TaskListComponent);
    expect(router.url).toBe('/tasks');
  });

  it('activates the tasks view for an already logged-in user', async () => {
    session.login();

    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/tasks', TaskListComponent);

    expect(router.url).toBe('/tasks');
  });
});
