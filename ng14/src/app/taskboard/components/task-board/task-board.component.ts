import { Component } from '@angular/core';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'tb-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent {
  constructor(private readonly taskService: TaskService) {}

  get tasks(): Task[] {
    return this.taskService.tasks;
  }

  addTask(task: Omit<Task, 'id'>): void {
    this.taskService.add(task);
  }
}
