import { ITaskRepository } from '../../../domain/task/ITaskRepository';
import { Task } from '../../../domain/task/Task';
import { TaskId } from '../../../domain/task/TaskId';
import { Title } from '../../../domain/task/Title';
import { Completed } from '../../../domain/task/Completed';
import { TaskModel } from '../schema/TaskSchema';

export class TaskRepository implements ITaskRepository {

    async add(task: Task): Promise<Task> {
        const created = await TaskModel.create({
            _id: task.id.value,
            title: task.title.value,
            completed: task.completed.value,
        });

        return Task.rehydrate(
            new TaskId(created._id.toString()),
            Title.from(created.title),
            Completed.from(created.completed)
        );
    }

    async update(task: Task): Promise<Task> {
        const existing = await TaskModel.findById(task.id.value);
        if (!existing) throw new Error('Task not found');

        existing.title = task.title.value;
        existing.completed = task.completed.value;
        const saved = await existing.save();

        return Task.rehydrate(
            new TaskId(saved._id.toString()),
            Title.from(saved.title),
            Completed.from(saved.completed)
        );
    }

    async getAllAsync(): Promise<Task[]> {
        const docs = await TaskModel.find();
        return docs.map(d =>
            Task.rehydrate(
                new TaskId(d._id.toString()),
                Title.from(d.title),
                Completed.from(d.completed)
            )
        );
    }
    async getByIdAsync(id: TaskId): Promise<Task> {
        const doc = await TaskModel.findById(id.value);
        if (!doc) throw new Error(`Task with id ${id.value} not found`);

        return Task.rehydrate(
            new TaskId(doc._id.toString()),
            Title.from(doc.title),
            Completed.from(doc.completed)
        );
    }
    async getByIdsAsync(ids: TaskId[]): Promise<Task[]> {
        const idValues = ids.map(i => i.value);
        const docs = await TaskModel.find({ _id: { $in: idValues } });
        return docs.map(d =>
            Task.rehydrate(
                new TaskId(d._id.toString()),
                Title.from(d.title),
                Completed.from(d.completed)
            )
        );
    }

    async delete(id: TaskId): Promise<void> {
        await TaskModel.findByIdAndDelete(id.value);
    }

    async getByCompleted(completed: boolean): Promise<Task[]> {
        const docs = await TaskModel.find({ completed });
        return docs.map(d =>
            Task.rehydrate(
                new TaskId(d._id.toString()),
                Title.from(d.title),
                Completed.from(d.completed)
            )
        );
    }

    async search(
        searchQuery?: string,
        completed?: boolean,
        pageNumber = 1,
        pageSize = 10
    ): Promise<{ items: Task[], totalCount: number }> {
        const filter: any = {};
        if (searchQuery) filter.title = { $regex: searchQuery, $options: 'i' };
        if (completed !== undefined) filter.completed = completed;

        const totalCount = await TaskModel.countDocuments(filter);
        const docs = await TaskModel.find(filter)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        const items = docs.map(d =>
            Task.rehydrate(
                new TaskId(d._id.toString()),
                Title.from(d.title),
                Completed.from(d.completed)
            )
        );

        return { items, totalCount };
    }
}
