import { Pipe, PipeTransform } from '@angular/core';

import { TaskStatus } from '../models/task.model';

@Pipe({ name: 'status', standalone: true })
export class StatusPipe implements PipeTransform {
  transform(status: TaskStatus | string): string {
    switch (status) {
      case 'ready':
        return 'Ready';
      case 'in-progress':
        return 'In progress';
      case 'done':
        return 'Done';
      default:
        return 'Unknown';
    }
  }
}
