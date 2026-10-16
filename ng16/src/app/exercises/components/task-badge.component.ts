// TODO Angular 16 — see lessons/01-components-templates.md
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tb-task-badge',
  standalone: true,
  template: '',
})
export class TaskBadgeComponent {
  @Input() label = '';
  @Input() tone: 'ok' | 'warn' | 'crit' = 'ok';
}
