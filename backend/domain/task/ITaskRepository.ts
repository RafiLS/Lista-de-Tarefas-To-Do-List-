import { Task } from './Task';
import { TaskId } from './TaskId';

/**
 * Repository interface for Task.
 */
export interface ITaskRepository {
    add(task: Task): Promise<Task>;
    update(task: Task): Promise<Task>;
    getAllAsync(): Promise<Task[]>;
    getByIdAsync(id: TaskId): Promise<Task>;
    getByIdsAsync(ids: TaskId[]): Promise<Task[]>;
    delete(id: TaskId): Promise<void>;

    getByCompleted(completed: boolean): Promise<Task[]>;
    search(
        searchQuery?: string,
        completed?: boolean,
        pageNumber?: number,
        pageSize?: number
    ): Promise<{ items: Task[]; totalCount: number }>;
}
