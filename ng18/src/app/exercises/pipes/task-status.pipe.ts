// TODO Angular 18 — see lessons/02-directives-pipes.md
import { Pipe, PipeTransform } from '@angular/core';

import { TaskStatus } from '../models';

@Pipe({
  name: 'taskStatus',
  standalone: true,
})
export class TaskStatusPipe implements PipeTransform {
  transform(status: TaskStatus | string): string {
    return '';
  }
}
