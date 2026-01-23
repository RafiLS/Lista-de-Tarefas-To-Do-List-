import { Task } from './Task';
import { TaskId } from './TaskId';
import { Title } from './Title';
import { Completed } from './Completed';

/**
 * Factory for creating Task aggregates
 */
export class TaskFactory {

  public static createTask(titleString: string): Task {
    const title = Title.from(titleString);
    return Task.create(title);
  }

  public static rehydrateTask(
    id: TaskId,
    titleString: string,
    completedValue: boolean
  ): Task {
    const title = Title.from(titleString);
    const completed = Completed.from(completedValue);
    return Task.rehydrate(id, title, completed);
  }
}
