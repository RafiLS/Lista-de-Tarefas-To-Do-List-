import { TaskModel } from '../infrastructure/task/schema/TaskSchema';

describe('TaskModel Unit Tests', () => {

  it('should create a Task with a title and default completed = false', () => {
    const task = new TaskModel({ title: 'Unit Test Task' });

    expect(task.title).toBe('Unit Test Task');
    expect(task.completed).toBe(false);
  });

  it('should create a Task with completed = true if specified', () => {
    const task = new TaskModel({ title: 'Done Task', completed: true });

    expect(task.title).toBe('Done Task');
    expect(task.completed).toBe(true);
  });

  it('should create multiple Task instances independently', () => {
    const task1 = new TaskModel({ title: 'Task 1' });
    const task2 = new TaskModel({ title: 'Task 2', completed: true });

    expect(task1.title).toBe('Task 1');
    expect(task1.completed).toBe(false);

    expect(task2.title).toBe('Task 2');
    expect(task2.completed).toBe(true);
  });

  it('should allow title with spaces (trimming not automatic)', () => {
    const task = new TaskModel({ title: '  Task with spaces  ' });

    expect(task.title).toBe('  Task with spaces  ');
  });

});
