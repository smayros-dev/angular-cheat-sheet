import { Injectable, computed, signal } from '@angular/core';

import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly taskState = signal<Task[]>([
    { id: 1, title: 'Set up the workspace', status: 'done' },
    { id: 2, title: 'Build the task list', status: 'in-progress' },
    { id: 3, title: 'Write the docs', status: 'ready' },
  ]);

  readonly tasks = this.taskState.asReadonly();

  readonly doneCount = computed(
    () => this.taskState().filter(task => task.status === 'done').length
  );

  private nextId = 4;

  add(task: Omit<Task, 'id'>): Task {
    const created: Task = { id: this.nextId++, ...task };
    this.taskState.update(tasks => [...tasks, created]);
    return created;
  }

  remove(id: number): void {
    this.taskState.update(tasks => tasks.filter(task => task.id !== id));
  }

  clearDone(): void {
    this.taskState.update(tasks => tasks.filter(task => task.status !== 'done'));
  }
}
