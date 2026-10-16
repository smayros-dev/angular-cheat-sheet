import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { Task } from '../../models/task.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { StatusPipe } from '../../pipes/status.pipe';

@Component({
  selector: 'tb-task-list',
  standalone: true,
  imports: [NgIf, NgFor, StatusPipe, HighlightDirective],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  trackByTask(index: number, task: Task): number {
    return task.id;
  }
}
