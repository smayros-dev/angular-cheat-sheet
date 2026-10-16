import { Component, Input } from '@angular/core';

import { Task } from '../../models/task.model';

@Component({
  selector: 'tb-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  trackByTask(index: number, task: Task): number {
    return task.id;
  }
}
