import { Task } from '../../domain/task/Task';
import { TaskId } from '../../domain/task/TaskId';
import { TaskDTO } from './TaskDTO';
import { Title } from '../../domain/task/Title';
import { Completed } from '../../domain/task/Completed';

export class TaskMapper {
  static toDTO(task: Task): TaskDTO {
    return {
      id: task.id.value,
      title: task.title.value,
      completed: task.completed.value,
    };
  }

  static fromDTO(dto: TaskDTO): Task {
    return Task.rehydrate(
      new TaskId(dto.id),
      Title.from(dto.title),
      Completed.from(dto.completed)
    );
  }
}