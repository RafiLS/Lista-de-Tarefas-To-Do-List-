import { TaskMapper } from '../application/task/TaskMapper';
import { TaskFactory } from '../domain/task/TaskFactory';
import { TaskDTO } from '../application/task/TaskDTO';
import { TaskId } from '../domain/task/TaskId';
import { Task } from '../domain/task/Task';

describe('TaskMapper Unit Tests', () => {

  it('should map Task to TaskDTO', () => {
    const task = TaskFactory.createTask('Test Task');

    const dto = TaskMapper.toDTO(task);

    expect(dto.id).toBe(task.id.value);
    expect(dto.title).toBe('Test Task');
    expect(dto.completed).toBe(false);
  });

  it('should map TaskDTO to Task', () => {
    const dto: TaskDTO = { id: '123', title: 'DTO Task', completed: true };

    const task = TaskMapper.fromDTO(dto);

    expect(task.id.value).toBe('123');
    expect(task.title.value).toBe('DTO Task');
    expect(task.completed.value).toBe(true);
    expect(task).toBeInstanceOf(Task);
  });

  it('should map TaskDTO with undefined completed to Task with completed=false', () => {
    const dto: TaskDTO = { id: '456', title: 'No Completed Task' };

    const task = TaskMapper.fromDTO(dto);

    expect(task.completed.value).toBe(false);
  });

  it('should map create DTO to Task', () => {
    const createDto = { title: 'Create DTO Task', completed: true };

    const task = TaskMapper.fromCreateDTO(createDto);

    expect(task.title.value).toBe('Create DTO Task');
    expect(task.completed.value).toBe(true);
    expect(task.id).toBeInstanceOf(TaskId);
    expect(task).toBeInstanceOf(Task);
  });

});
