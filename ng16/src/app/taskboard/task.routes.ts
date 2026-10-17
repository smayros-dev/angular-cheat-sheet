import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { LoginComponent } from './login/login.component';
import { SessionService } from './services/session.service';

export const canActivateTasks: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);
  return session.isLoggedIn() ? true : router.parseUrl('/login');
};

export const taskRoutes: Routes = [
  { path: '', component: TaskBoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [canActivateTasks] },
];
