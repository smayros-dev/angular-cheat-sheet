import { TestBed } from '@angular/core/testing';

import { TaskStats } from './task-stats.service';

describe('TaskStats', () => {
  let stats: TaskStats;

  beforeEach(() => {
    stats = TestBed.inject(TaskStats);
  });

  it('starts with no tasks', () => {
    expect(stats.all()).toEqual([]);
    expect(stats.counts()).toEqual({ ready: 0, inProgress: 0, done: 0 });
  });

  it('adds tasks and counts them by status', () => {
    stats.add({ title: 'Ship it', status: 'ready' });
    stats.add({ title: 'Review the PR', status: 'in-progress' });
    stats.add({ title: 'Write the docs', status: 'done' });

    expect(stats.all().length).toBe(3);
    expect(typeof stats.all()[0].id).toBe('number');
    expect(stats.counts()).toEqual({ ready: 1, inProgress: 1, done: 1 });
  });

  it('moves a task to done when marked', () => {
    stats.add({ title: 'Ship it', status: 'ready' });
    stats.add({ title: 'Write the docs', status: 'ready' });

    const first = stats.all()[0];
    stats.markDone(first.id);

    expect(stats.all()[0].status).toBe('done');
    expect(stats.counts()).toEqual({ ready: 1, inProgress: 0, done: 1 });
  });

  it('ignores markDone for an unknown id', () => {
    stats.add({ title: 'Ship it', status: 'ready' });

    stats.markDone(999);

    expect(stats.all()[0].status).toBe('ready');
    expect(stats.counts()).toEqual({ ready: 1, inProgress: 0, done: 0 });
  });
});
