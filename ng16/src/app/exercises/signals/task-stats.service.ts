// TODO Angular 16 — see lessons/07-signals-cd.md
import { Injectable } from '@angular/core';

import { Task } from '../models';

@Injectable({ providedIn: 'root' })
export class TaskStats {
  all(): Task[] {
    throw new Error('TODO Angular 16 — see lessons/07-signals-cd.md');
  }

  add(task: Omit<Task, 'id'>): void {
    throw new Error('TODO Angular 16 — see lessons/07-signals-cd.md');
  }

  markDone(id: number): void {
    throw new Error('TODO Angular 16 — see lessons/07-signals-cd.md');
  }

  counts(): { ready: number; inProgress: number; done: number } {
    throw new Error('TODO Angular 16 — see lessons/07-signals-cd.md');
  }
}
