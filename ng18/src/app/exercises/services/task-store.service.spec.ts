import { TestBed } from '@angular/core/testing';

import { TaskStore } from './task-store.service';

describe('TaskStore', () => {
  let store: TaskStore;

  beforeEach(() => {
    store = TestBed.inject(TaskStore);
  });

  it('starts with an empty list', () => {
    expect(store.tasks()).toEqual([]);
  });

  it('adds tasks with generated ids', () => {
    const first = store.add({ title: 'Ship it', status: 'ready' });
    const second = store.add({ title: 'Write the docs', status: 'done' });

    expect(typeof first.id).toBe('number');
    expect(second.id).not.toBe(first.id);
    expect(store.tasks()).toEqual([first, second]);
  });

  it('removes a found task and returns true', () => {
    const created = store.add({ title: 'Ship it', status: 'ready' });

    expect(store.remove(created.id)).toBe(true);
    expect(store.tasks().length).toBe(0);
  });

  it('returns false when removing a missing id', () => {
    expect(store.remove(999)).toBe(false);
  });

  it('clears only done tasks and returns the number removed', () => {
    store.add({ title: 'Ship it', status: 'ready' });
    store.add({ title: 'Review the PR', status: 'in-progress' });
    store.add({ title: 'Write the docs', status: 'done' });

    expect(store.clearDone()).toBe(1);
    expect(store.tasks().length).toBe(2);
    expect(store.tasks().some(task => task.status === 'done')).toBe(false);
  });
});
