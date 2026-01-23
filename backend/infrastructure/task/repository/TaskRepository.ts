import { Task } from '../../../domain/task/Task';
import { TaskId } from '../../../domain/task/TaskId';
import { Title } from '../../../domain/task/Title';
import { Completed } from '../../../domain/task/Completed';
import { TaskModel } from '../schema/TaskSchema';
import { TaskFactory } from '../../../domain/task/TaskFactory';

export class TaskRepository {
  async add(task: Task): Promise<Task> {
    const created = await TaskModel.create({
      title: task.title.value,
      completed: task.completed.value,
    });

    return TaskFactory.rehydrateTask(
      new TaskId(created._id.toString()),
      created.title,
      created.completed
    );
  }

  async update(task: Task): Promise<Task> {
    const existing = await TaskModel.findById(task.id.value);
    if (!existing) throw new Error('Task not found');

    existing.title = task.title.value;
    existing.completed = task.completed.value;
    const saved = await existing.save();

    return TaskFactory.rehydrateTask(
      new TaskId(saved._id.toString()),
      saved.title,
      saved.completed
    );
  }

  async getAllAsync(): Promise<Task[]> {
    const docs = await TaskModel.find();
    return docs.map(d =>
      TaskFactory.rehydrateTask(
        new TaskId(d._id.toString()),
        d.title,
        d.completed
      )
    );
  }

  async getByIdAsync(id: TaskId): Promise<Task> {
    const doc = await TaskModel.findById(id.value);
    if (!doc) throw new Error(`Task with id ${id.value} not found`);

    return TaskFactory.rehydrateTask(
      new TaskId(doc._id.toString()),
      doc.title,
      doc.completed
    );
  }

  async delete(id: TaskId): Promise<void> {
    await TaskModel.findByIdAndDelete(id.value);
  }

  async getByCompleted(completed: boolean): Promise<Task[]> {
    const docs = await TaskModel.find({ completed });
    return docs.map(d =>
      TaskFactory.rehydrateTask(
        new TaskId(d._id.toString()),
        d.title,
        d.completed
      )
    );
  }
}
