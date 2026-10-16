import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'tb-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    status: new FormControl<TaskStatus>('ready', { nonNullable: true }),
  });

  @Output() taskAdded = new EventEmitter<Omit<Task, 'id'>>();

  get titleRequired(): boolean {
    const title = this.form.controls.title;
    return title.touched && title.hasError('required');
  }

  get titleTooShort(): boolean {
    const title = this.form.controls.title;
    return title.touched && title.hasError('minlength');
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.taskAdded.emit({
      title: this.form.controls.title.value,
      status: this.form.controls.status.value,
    });
    this.form.reset({ title: '', status: 'ready' });
  }
}
