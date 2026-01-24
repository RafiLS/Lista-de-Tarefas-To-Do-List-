import { TaskId } from '../domain/task/TaskId';

describe('TaskId Value Object', () => {

  it('should create a TaskId with a generated value', () => {
    const id = new TaskId();
    expect(typeof id.asString()).toBe('string');
    expect(id.asString().length).toBeGreaterThan(0);
  });

  it('should create a TaskId from a given string', () => {
    const given = 'my-task-123';
    const id = new TaskId(given);
    expect(id.asString()).toBe(given);
  });

  it('two TaskIds created with no value should be different', () => {
    const id1 = new TaskId();
    const id2 = new TaskId();
    expect(id1.asString()).not.toBe(id2.asString());
  });

  it('two TaskIds with same string should be equal in value', () => {
    const value = 'same-id';
    const id1 = new TaskId(value);
    const id2 = new TaskId(value);
    expect(id1.asString()).toBe(id2.asString());
  });
});
