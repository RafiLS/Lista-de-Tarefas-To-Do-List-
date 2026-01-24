import { Completed } from '../domain/task/Completed';

describe('Completed Value Object', () => {

  it('should create a Completed object with true', () => {
    const completed = Completed.from(true);
    expect(completed.value).toBe(true);
    expect(completed.toString()).toBe('true');
  });

  it('should create a Completed object with false', () => {
    const completed = Completed.from(false);
    expect(completed.value).toBe(false);
    expect(completed.toString()).toBe('false');
  });

  it('two Completed objects with same value should be equal', () => {
    const c1 = Completed.from(true);
    const c2 = Completed.from(true);
    expect(c1.equals(c2)).toBe(true);
  });

  it('two Completed objects with different values should not be equal', () => {
    const c1 = Completed.from(true);
    const c2 = Completed.from(false);
    expect(c1.equals(c2)).toBe(false);
  });
});
