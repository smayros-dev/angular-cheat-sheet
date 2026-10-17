// TODO Angular 18 — see lessons/03-services-di.md
import { Injectable } from '@angular/core';

import { Task } from '../models';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  tasks(): Task[] {
    throw new Error('TODO Angular 18 — see lessons/03-services-di.md');
  }

  add(task: Omit<Task, 'id'>): Task {
    throw new Error('TODO Angular 18 — see lessons/03-services-di.md');
  }

  remove(id: number): boolean {
    throw new Error('TODO Angular 18 — see lessons/03-services-di.md');
  }

  clearDone(): number {
    throw new Error('TODO Angular 18 — see lessons/03-services-di.md');
  }
}
