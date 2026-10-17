import { Component } from '@angular/core';

import { Task } from '../../models/task.model';
import { SessionService } from '../../services/session.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'tb-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent {
  constructor(
    private readonly taskService: TaskService,
    readonly session: SessionService
  ) {}

  get tasks(): Task[] {
    return this.taskService.tasks;
  }

  get doneCount(): number {
    return this.taskService.doneCount;
  }

  addTask(task: Omit<Task, 'id'>): void {
    this.taskService.add(task);
  }
}
