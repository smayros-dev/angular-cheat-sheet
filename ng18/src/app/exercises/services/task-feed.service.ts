// TODO Angular 18 — see lessons/04-rxjs-async.md
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from '../models';

@Injectable({ providedIn: 'root' })
export class TaskFeed {
  watch(): Observable<Task[]> {
    return of();
  }

  push(task: Omit<Task, 'id'>): void {
    throw new Error('TODO Angular 18 — see lessons/04-rxjs-async.md');
  }
}
