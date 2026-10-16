// TODO Angular 18 — see lessons/05-forms.md
import { Component, EventEmitter, Output } from '@angular/core';

import { Task } from '../models';

@Component({
  selector: 'tb-task-form',
  standalone: true,
  template: '',
})
export class TaskFormComponent {
  @Output() readonly submitted = new EventEmitter<Omit<Task, 'id'>>();
}
