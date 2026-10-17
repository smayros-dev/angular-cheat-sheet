import { TestBed } from '@angular/core/testing';

import { Task } from '../models';
import { TaskFeed } from './task-feed.service';

describe('TaskFeed', () => {
  let feed: TaskFeed;

  beforeEach(() => {
    feed = TestBed.inject(TaskFeed);
  });

  it('emits the current list on subscribe', () => {
    const emissions: Task[][] = [];
    const subscription = feed.watch().subscribe(list => emissions.push(list));

    expect(emissions).toEqual([[]]);

    subscription.unsubscribe();
  });

  it('emits the updated list after a push', () => {
    const emissions: Task[][] = [];
    const subscription = feed.watch().subscribe(list => emissions.push(list));

    feed.push({ title: 'Ship it', status: 'ready' });

    expect(emissions.length).toBe(2);
    expect(emissions[0]).toEqual([]);
    expect(emissions[1].length).toBe(1);
    expect(emissions[1][0].title).toBe('Ship it');
    expect(typeof emissions[1][0].id).toBe('number');

    subscription.unsubscribe();
  });
});
