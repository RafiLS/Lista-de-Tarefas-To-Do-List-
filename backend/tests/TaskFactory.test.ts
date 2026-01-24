import { TaskFactory } from '../domain/task/TaskFactory';
import { Task } from '../domain/task/Task';
import { TaskId } from '../domain/task/TaskId';


describe('TaskFactory', () => {

  it('should create a task with default completed as false', () => {
    const task: Task = TaskFactory.createTask('Learn Jest');

    expect(task).toBeInstanceOf(Task);
    expect(task.title.value).toBe('Learn Jest');
    expect(task.completed.value).toBe(false);
    expect(task.id).toBeInstanceOf(TaskId);
  });

  it('should rehydrate a task with given id, title, and completed', () => {
    const id = new TaskId('task-123');
    const task: Task = TaskFactory.rehydrateTask(id, 'Rehydrated Task', true);

    expect(task).toBeInstanceOf(Task);
    expect(task.id.asString()).toBe('task-123');
    expect(task.title.value).toBe('Rehydrated Task');
    expect(task.completed.value).toBe(true);
  });
});
