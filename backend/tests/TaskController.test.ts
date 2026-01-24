import { TaskController } from '../controller/TaskController';
import { TaskService } from '../application/task/TaskService';
import { TaskDTO } from '../application/task/TaskDTO';

jest.mock('../application/task/TaskService');

describe('TaskController Unit Tests', () => {
  let mockService: jest.Mocked<TaskService>;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = new TaskService() as jest.Mocked<TaskService>;

    TaskController.setService(mockService);

    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('should create a task', async () => {
    req.body = { title: 'New Task', completed: true };
    const dto: TaskDTO = { id: '1', title: 'New Task', completed: true };
    mockService.createTask.mockResolvedValue(dto);

    await TaskController.createTask(req, res);

    expect(mockService.createTask).toHaveBeenCalledWith({ title: 'New Task', completed: true });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(dto);
  });

  it('should return 400 if title is missing in createTask', async () => {
    req.body = {};
    await TaskController.createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Title is required' });
    expect(mockService.createTask).not.toHaveBeenCalled();
  });

  it('should get all tasks', async () => {
    const tasks: TaskDTO[] = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
    ];
    mockService.getAllTasks.mockResolvedValue(tasks);

    await TaskController.getAllTasks(req, res);

    expect(mockService.getAllTasks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  it('should get task by id', async () => {
    req.params.id = '1';
    const task: TaskDTO = { id: '1', title: 'Task 1', completed: false };
    mockService.getTaskById.mockResolvedValue(task);

    await TaskController.getTaskById(req, res);

    expect(mockService.getTaskById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(task);
  });

  it('should update a task', async () => {
    req.params.id = '1';
    req.body = { title: 'Updated Task', completed: true };
    const updated: TaskDTO = { id: '1', title: 'Updated Task', completed: true };
    mockService.updateTask.mockResolvedValue(updated);

    await TaskController.updateTask(req, res);

    expect(mockService.updateTask).toHaveBeenCalledWith('1', { title: 'Updated Task', completed: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('should delete a task', async () => {
    req.params.id = '1';
    mockService.deleteTask.mockResolvedValue();

    await TaskController.deleteTask(req, res);

    expect(mockService.deleteTask).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('should get tasks by completed', async () => {
    req.query.completed = 'true';
    const tasks: TaskDTO[] = [{ id: '1', title: 'Done Task', completed: true }];
    mockService.getTasksByCompleted.mockResolvedValue(tasks);

    await TaskController.getTasksByCompleted(req, res);

    expect(mockService.getTasksByCompleted).toHaveBeenCalledWith(true);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  it('should mark task as completed', async () => {
    req.params.id = '1';
    const task: TaskDTO = { id: '1', title: 'Incomplete Task', completed: true };
    mockService.markAsCompleted.mockResolvedValue(task);

    await TaskController.completeTask(req, res);

    expect(mockService.markAsCompleted).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(task);
  });

  it('should return 400 for invalid id in completeTask', async () => {
    req.params.id = undefined;

    await TaskController.completeTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'ID valid' });
    expect(mockService.markAsCompleted).not.toHaveBeenCalled();
  });
});
