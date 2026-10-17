import { TaskStatusPipe } from './task-status.pipe';

describe('TaskStatusPipe', () => {
  let pipe: TaskStatusPipe;

  beforeEach(() => {
    pipe = new TaskStatusPipe();
  });

  it('maps ready to "Ready"', () => {
    expect(pipe.transform('ready')).toBe('Ready');
  });

  it('maps in-progress to "In progress"', () => {
    expect(pipe.transform('in-progress')).toBe('In progress');
  });

  it('maps done to "Done"', () => {
    expect(pipe.transform('done')).toBe('Done');
  });

  it('maps unknown values to "Unknown"', () => {
    expect(pipe.transform('blocked')).toBe('Unknown');
  });
});
