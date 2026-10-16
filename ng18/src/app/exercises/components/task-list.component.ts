// TODO Angular 18 — see lessons/02-directives-pipes.md
import { Component, Input } from '@angular/core';

import { Task } from '../models';

@Component({
  selector: 'tb-task-list',
  standalone: true,
  template: '',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
}
