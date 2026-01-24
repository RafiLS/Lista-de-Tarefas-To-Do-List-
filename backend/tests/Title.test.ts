import { Title } from '../domain/task/Title';

describe('Title Value Object', () => {

  it('should create a valid title', () => {
    const title = Title.from('Study Jest');
    expect(title.value).toBe('Study Jest');
  });

  it('should trim spaces', () => {
    const title = Title.from('   Important task   ');
    expect(title.value).toBe('Important task');
  });

  it('should throw error for empty string', () => {
    expect(() => {
      Title.from('');
    }).toThrow('The task title cannot be empty.');
  });

  it('should throw error for only spaces', () => {
    expect(() => {
      Title.from('   ');
    }).toThrow('The task title cannot be empty.');
  });

  it('should return value in toString()', () => {
    const title = Title.from('Backend Test');
    expect(title.toString()).toBe('Backend Test');
  });

  it('should be equal when values are the same', () => {
    const t1 = Title.from('Task');
    const t2 = Title.from('Task');
    expect(t1.equals(t2)).toBe(true);
  });

  it('should not be equal when values are different', () => {
    const t1 = Title.from('Task A');
    const t2 = Title.from('Task B');
    expect(t1.equals(t2)).toBe(false);
  });
});
