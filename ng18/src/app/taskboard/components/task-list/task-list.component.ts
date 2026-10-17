import { Component, Input } from '@angular/core';

import { Task } from '../../models/task.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { StatusPipe } from '../../pipes/status.pipe';

@Component({
  selector: 'tb-task-list',
  standalone: true,
  imports: [StatusPipe, HighlightDirective],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
}
