import { AggregateRoot } from '../common/AggregateRoot';
import { TaskId } from './TaskId';
import { Title } from './Title';
import { Completed } from './Completed';

export class Task extends AggregateRoot<TaskId> {
  private _title: Title;
  private _completed: Completed;

  public get title(): Title { return this._title; }
  public get completed(): Completed { return this._completed; }

  private constructor(id: TaskId, title: Title, completed: Completed) {
    super();
    this.id = id;
    this._title = title;
    this._completed = completed;
  }

  public static create(title: Title, completed?: Completed): Task {
  return new Task(
    new TaskId(),
    title,
    completed ?? Completed.from(false)
  );
}

  public static rehydrate(id: TaskId, title: Title, completed: Completed): Task {
    return new Task(id, title, completed);
  }

  public updateTitle(newTitle: Title): void {
    this._title = newTitle;
  }

  public complete(): void {
    this._completed = Completed.from(true);
  }

  public undo(): void {
    this._completed = Completed.from(false);
  }
}
