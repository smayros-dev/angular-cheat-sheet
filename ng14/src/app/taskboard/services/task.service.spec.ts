import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = TestBed.inject(TaskService);
  });

  it('seeds a list of 3 tasks', () => {
    expect(service.tasks.length).toBe(3);
  });

  it('adds a task with the next id', () => {
    const created = service.add({ title: 'Review the PR', status: 'ready' });

    expect(created.id).toBe(4);
    expect(service.tasks.length).toBe(4);
    expect(service.tasks[3]).toEqual({ id: 4, title: 'Review the PR', status: 'ready' });
  });

  it('removes a task by id', () => {
    service.remove(2);

    expect(service.tasks.length).toBe(2);
    expect(service.tasks.find(task => task.id === 2)).toBeUndefined();
  });

  it('ignores removal of an unknown id', () => {
    service.remove(999);

    expect(service.tasks.length).toBe(3);
  });

  it('derives the done count from the task list', () => {
    expect(service.doneCount).toBe(1);

    service.add({ title: 'Review the PR', status: 'done' });

    expect(service.doneCount).toBe(2);
  });

  it('clears only the tasks marked done', () => {
    service.clearDone();

    expect(service.tasks.length).toBe(2);
    expect(service.tasks.some(task => task.status === 'done')).toBeFalse();
  });
});
