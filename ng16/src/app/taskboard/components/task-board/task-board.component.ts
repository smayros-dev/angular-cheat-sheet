import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Task } from '../../models/task.model';
import { SessionService } from '../../services/session.service';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'tb-task-board',
  standalone: true,
  imports: [NgIf, RouterLink, TaskFormComponent, TaskListComponent],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent {
  private readonly taskService = inject(TaskService);
  protected readonly session = inject(SessionService);

  readonly tasks = computed(() => this.taskService.tasks());

  addTask(task: Omit<Task, 'id'>): void {
    this.taskService.add(task);
  }
}
