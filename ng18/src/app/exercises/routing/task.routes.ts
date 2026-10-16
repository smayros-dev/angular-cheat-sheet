// TODO Angular 18 — see lessons/06-routing.md
import { Routes } from '@angular/router';

import { TaskListComponent } from '../components/task-list.component';
import { canActivateTasks } from './can-activate-tasks.guard';
import { LoginComponent } from './login.component';

export const taskRoutes: Routes = [
  { path: 'tasks', component: TaskListComponent, canActivate: [canActivateTasks] },
  { path: 'login', component: LoginComponent },
];
