import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HighlightDirective } from './directives/highlight.directive';
import { LoginComponent } from './login/login.component';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  declarations: [
    TaskBoardComponent,
    TaskListComponent,
    TaskFormComponent,
    LoginComponent,
    AdminComponent,
    StatusPipe,
    HighlightDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [TaskBoardComponent, StatusPipe, HighlightDirective],
})
export class TaskboardModule {}
