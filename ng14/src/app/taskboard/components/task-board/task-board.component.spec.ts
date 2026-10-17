import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskboardModule } from '../../taskboard.module';
import { TaskBoardComponent } from './task-board.component';

describe('TaskBoardComponent', () => {
  let fixture: ComponentFixture<TaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskboardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoardComponent);
    fixture.detectChanges();
  });

  it('renders the 3 seeded tasks', () => {
    const element: HTMLElement = fixture.nativeElement;
    const items = element.querySelectorAll('li');

    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Set up the workspace');
    expect(items[0].textContent).toContain('Done');
    expect(items[1].textContent).toContain('Build the task list');
    expect(items[1].textContent).toContain('In progress');
    expect(items[2].textContent).toContain('Write the docs');
    expect(items[2].textContent).toContain('Ready');
  });

  it('does not render the empty state when tasks are seeded', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('p.empty')).toBeNull();
  });
});
