import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  const pipe = new StatusPipe();

  it('maps ready to "Ready"', () => {
    expect(pipe.transform('ready')).toBe('Ready');
  });

  it('maps in-progress to "In progress"', () => {
    expect(pipe.transform('in-progress')).toBe('In progress');
  });

  it('maps done to "Done"', () => {
    expect(pipe.transform('done')).toBe('Done');
  });

  it('maps anything else to "Unknown"', () => {
    expect(pipe.transform('archived')).toBe('Unknown');
    expect(pipe.transform('')).toBe('Unknown');
  });
});
