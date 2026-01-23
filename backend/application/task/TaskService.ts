import { TaskDTO } from './TaskDTO';
import { TaskFactory } from '../../domain/task/TaskFactory';
import { TaskMapper } from './TaskMapper';
import { TaskRepository } from '../../infrastructure/task/repository/TaskRepository';
import { TaskId } from '../../domain/task/TaskId';
import { Title } from '../../domain/task/Title';

export class TaskService {
  private readonly taskRepo: TaskRepository;

  constructor() {
    this.taskRepo = new TaskRepository();
  }

  async createTask(dto: TaskDTO): Promise<TaskDTO> {
    const task = TaskFactory.createTask(dto.title);

    if (dto.completed) task.complete();

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

  async updateTask(id: string, dto: TaskDTO): Promise<TaskDTO> {
    const task = await this.taskRepo.getByIdAsync(new TaskId(id));

    if (dto.title) task.updateTitle(Title.from(dto.title));
    if (dto.completed !== undefined) {
      if (dto.completed) task.complete();
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

  async markAsCompleted(id: string): Promise<TaskDTO> {
    const task = await this.taskRepo.getByIdAsync(new TaskId(id));
    if (!task) throw new Error('Task not found');

    task.complete(); 
    const updated = await this.taskRepo.update(task);

    return TaskMapper.toDTO(updated);
  }
}
