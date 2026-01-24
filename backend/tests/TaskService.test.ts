import { TaskService } from '../application/task/TaskService';
import { TaskRepository } from '../infrastructure/task/repository/TaskRepository';
import { TaskDTO } from '../application/task/TaskDTO';
import { TaskFactory } from '../domain/task/TaskFactory';
import { TaskId } from '../domain/task/TaskId';

jest.mock('../infrastructure/task/repository/TaskRepository');

describe('TaskService Unit Tests', () => {
    let service: TaskService;
    let repoMock: jest.Mocked<TaskRepository>;

    beforeEach(() => {
        service = new TaskService();
        repoMock = (service as any).taskRepo;
        jest.clearAllMocks();
    });

    it('should create a new task', async () => {
        const dto: TaskDTO = { title: 'New Task', completed: true };
        const task = TaskFactory.createTask(dto.title);
        task.complete();

        repoMock.add.mockResolvedValue(task);

        const result = await service.createTask(dto);

        expect(repoMock.add).toHaveBeenCalled();
        expect(result.title).toBe('New Task');
        expect(result.completed).toBe(true);
        expect(result.id).toBe(task.id.value);
    });

    it('should get a task by id', async () => {
        const task = TaskFactory.createTask('Get Task');
        repoMock.getByIdAsync.mockResolvedValue(task);

        const result = await service.getTaskById(task.id.value);

        expect(repoMock.getByIdAsync).toHaveBeenCalledWith(task.id);
        expect(result.title).toBe('Get Task');
        expect(result.completed).toBe(false);
    });

    it('should get all tasks', async () => {
        const tasks = [TaskFactory.createTask('Task 1'), TaskFactory.createTask('Task 2')];
        repoMock.getAllAsync.mockResolvedValue(tasks);

        const result = await service.getAllTasks();

        expect(repoMock.getAllAsync).toHaveBeenCalled();
        expect(result.length).toBe(2);
        expect(result[0].title).toBe('Task 1');
        expect(result[1].title).toBe('Task 2');
    });

    it('should update a task title and completed', async () => {
        const task = TaskFactory.createTask('Old Task');
        repoMock.getByIdAsync.mockResolvedValue(task);
        repoMock.update.mockImplementation(async t => t);

        const updatedDTO: TaskDTO = { title: 'Updated Task', completed: true };

        const result = await service.updateTask(task.id.value, updatedDTO);

        expect(repoMock.getByIdAsync).toHaveBeenCalledWith(task.id);
        expect(repoMock.update).toHaveBeenCalled();
        expect(result.title).toBe('Updated Task');
        expect(result.completed).toBe(true);
    });

    it('should delete a task', async () => {
        const taskId = 'task123';
        await service.deleteTask(taskId);
        expect(repoMock.delete).toHaveBeenCalledWith(new TaskId(taskId));
    });

    it('should get tasks by completed status', async () => {
        const task1 = TaskFactory.createTask('Done Task');
        task1.complete();
        const task2 = TaskFactory.createTask('Pending Task');

        repoMock.getByCompleted.mockResolvedValue([task1]);

        const result = await service.getTasksByCompleted(true);

        expect(repoMock.getByCompleted).toHaveBeenCalledWith(true);
        expect(result.length).toBe(1);
        expect(result[0].completed).toBe(true);
    });

    it('should mark a task as completed', async () => {
        const task = TaskFactory.createTask('Incomplete Task');
        repoMock.getByIdAsync.mockResolvedValue(task);
        repoMock.update.mockImplementation(async t => t);

        const result = await service.markAsCompleted(task.id.value);

        expect(task.completed.value).toBe(true);
        expect(repoMock.update).toHaveBeenCalledWith(task);
        expect(result.completed).toBe(true);
    });

});
