import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './login/login.component';

export const taskRoutes: Routes = [
  { path: '', component: TaskBoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
];
