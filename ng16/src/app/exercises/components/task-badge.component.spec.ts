import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBadgeComponent } from './task-badge.component';

describe('TaskBadgeComponent', () => {
  let fixture: ComponentFixture<TaskBadgeComponent>;
  let component: TaskBadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the label inside a badge span', () => {
    component.label = 'Ship';
    component.tone = 'warn';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span.badge')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Ship');
  });

  it('applies the badge-{tone} class for each tone', () => {
    const tones: Array<'ok' | 'warn' | 'crit'> = ['ok', 'warn', 'crit'];

    for (const tone of tones) {
      component.label = 'Ship';
      component.tone = tone;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector(`span.badge.badge-${tone}`)).toBeTruthy();
      expect(fixture.nativeElement.textContent).toContain('Ship');
    }
  });
});
