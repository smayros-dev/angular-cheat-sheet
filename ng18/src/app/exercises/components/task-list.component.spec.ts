import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task } from '../models';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let fixture: ComponentFixture<TaskListComponent>;
  let component: TaskListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders one li per task with its title and piped status', () => {
    const tasks: Task[] = [
      { id: 1, title: 'Ship it', status: 'ready' },
      { id: 2, title: 'Write the docs', status: 'done' },
    ];
    component.tasks = tasks;
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0]?.textContent).toContain('Ship it');
    expect(items[0]?.textContent).toContain('Ready');
    expect(items[1]?.textContent).toContain('Write the docs');
    expect(items[1]?.textContent).toContain('Done');
  });

  it('renders the empty state when there are no tasks', () => {
    component.tasks = [];
    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('p.empty');
    expect(empty).toBeTruthy();
    expect(empty?.textContent).toContain('No tasks yet');
  });
});
