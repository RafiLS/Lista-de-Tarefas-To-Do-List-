import { ITaskRepository } from '../../domain/task/ITaskRepository';
import { TaskMapper } from './TaskMapper';
import { TaskDTO } from './TaskDTO';
import { TaskFactory } from '../../domain/task/TaskFactory';
import { TaskId } from '../../domain/task/TaskId';
import { Title } from '../../domain/task/Title';

export class TaskService {
  constructor(private taskRepo: ITaskRepository) {}

  async createTask(title: string, completed?: boolean): Promise<TaskDTO> {
    const task = TaskFactory.createTask(title);
    if (completed !== undefined && completed) {
      task.complete();
    }
    const saved = await this.taskRepo.add(task);
    return TaskMapper.toDTO(saved);
  }

  async getTaskById(id: string): Promise<TaskDTO> {
    const task = await this.taskRepo.getByIdAsync(new TaskId(id));
    return TaskMapper.toDTO(task);
  }

  async getAllTasks(): Promise<TaskDTO[]> {
    const tasks = await this.taskRepo.getAllAsync();
    return tasks.map(TaskMapper.toDTO);
  }

 async updateTask(id: string, title: string, completed?: boolean): Promise<TaskDTO> {
  const task = await this.taskRepo.getByIdAsync(new TaskId(id));

  task.updateTitle(Title.from(title));

  if (completed !== undefined) {
    if (completed) task.complete();
    else task.undo();
  }

  const updated = await this.taskRepo.update(task);
  return TaskMapper.toDTO(updated);
}

  async deleteTask(id: string): Promise<void> {
    await this.taskRepo.delete(new TaskId(id));
  }

  async getTasksByCompleted(completed: boolean): Promise<TaskDTO[]> {
    const tasks = await this.taskRepo.getByCompleted(completed);
    return tasks.map(TaskMapper.toDTO);
  }
}
