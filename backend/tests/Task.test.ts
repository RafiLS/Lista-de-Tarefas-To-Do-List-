import { Task } from '../domain/task/Task';
import { TaskId } from '../domain/task/TaskId';
import { Title } from '../domain/task/Title';
import { Completed } from '../domain/task/Completed';

describe('Task AggregateRoot', () => {

  it('should create a task with default completed as false', () => {
    const title = Title.from('Learn Jest');
    const task = Task.create(title);

    expect(task.title.value).toBe('Learn Jest');
    expect(task.completed.value).toBe(false);
    expect(task.id).toBeInstanceOf(TaskId);
  });

  it('should create a task with completed true if provided', () => {
    const title = Title.from('Test Task');
    const task = Task.create(title, Completed.from(true));

    expect(task.completed.value).toBe(true);
  });

  it('should rehydrate a task with given id, title, and completed', () => {
    const id = new TaskId('task-123');
    const title = Title.from('Rehydrate Task');
    const completed = Completed.from(true);
    const task = Task.rehydrate(id, title, completed);

    expect(task.id.asString()).toBe('task-123');
    expect(task.title.value).toBe('Rehydrate Task');
    expect(task.completed.value).toBe(true);
  });

  it('should update the title', () => {
    const task = Task.create(Title.from('Old Title'));
    task.updateTitle(Title.from('New Title'));

    expect(task.title.value).toBe('New Title');
  });

  it('should mark the task as completed', () => {
    const task = Task.create(Title.from('Task 1'));
    task.complete();

    expect(task.completed.value).toBe(true);
  });

  it('should undo the task completion', () => {
    const task = Task.create(Title.from('Task 2'), Completed.from(true));
    task.undo();

    expect(task.completed.value).toBe(false);
  });
});
