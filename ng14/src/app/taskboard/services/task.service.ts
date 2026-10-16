import { Injectable } from '@angular/core';

import { Task, TaskStatus } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks: Task[] = [
    { id: 1, title: 'Set up the workspace', status: 'done' },
    { id: 2, title: 'Build the task list', status: 'in-progress' },
    { id: 3, title: 'Write the docs', status: 'ready' },
  ];

  private nextId = 4;

  add(task: { title: string; status: TaskStatus }): Task {
    const created: Task = { id: this.nextId++, ...task };
    this.tasks.push(created);
    return created;
  }

  remove(id: number): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  clearDone(): void {
    for (let i = this.tasks.length - 1; i >= 0; i--) {
      if (this.tasks[i].status === 'done') {
        this.tasks.splice(i, 1);
      }
    }
  }
}
