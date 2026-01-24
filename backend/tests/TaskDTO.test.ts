import { TaskDTO } from '../application/task/TaskDTO';
import { TaskFactory } from '../domain/task/TaskFactory';

describe('TaskDTO Unit Tests', () => {

  it('should create a TaskDTO from a title', () => {
    const dto: TaskDTO = { title: 'My Task' };

    expect(dto.title).toBe('My Task');
    expect(dto.completed).toBeUndefined();
    expect(dto.id).toBeUndefined();
  });

  it('should allow completed to be true', () => {
    const dto: TaskDTO = { title: 'My Done Task', completed: true };

    expect(dto.completed).toBe(true);
  });

  it('should allow id to be set', () => {
    const dto: TaskDTO = { id: '123', title: 'Task with ID' };

    expect(dto.id).toBe('123');
    expect(dto.title).toBe('Task with ID');
  });

  it('should convert Task to TaskDTO (factory example)', () => {
    const task = TaskFactory.createTask('Factory Task');

    const dto: TaskDTO = {
      id: task.id.asString(),
      title: task.title.value,
      completed: task.completed.value,
    };

    expect(dto.id).toBe(task.id.asString());
    expect(dto.title).toBe('Factory Task');
    expect(dto.completed).toBe(false);
  });

});
