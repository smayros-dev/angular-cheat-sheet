import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Task } from '../../models/task.model';
import { SessionService } from '../../services/session.service';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'tb-task-board',
  standalone: true,
  imports: [RouterLink, TaskFormComponent, TaskListComponent],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent {
  private readonly taskService = inject(TaskService);
  protected readonly session = inject(SessionService);

  readonly tasks = this.taskService.tasks;
  readonly doneCount = this.taskService.doneCount;

  addTask(task: Omit<Task, 'id'>): void {
    this.taskService.add(task);
  }
}
