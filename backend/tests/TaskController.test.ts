import request from 'supertest';
import express from 'express';
import { TaskController } from '../controller/TaskController';
import { TaskService } from '../application/task/TaskService';
import { TaskDTO } from '../application/task/TaskDTO';

// Mock do módulo inteiro
jest.mock('../application/task/TaskService');

const app = express();
app.use(express.json());

app.post('/tasks', TaskController.createTask);
app.get('/tasks', TaskController.getAllTasks);
app.get('/tasks/:id', TaskController.getTaskById);
app.put('/tasks/:id', TaskController.updateTask);
app.delete('/tasks/:id', TaskController.deleteTask);
app.get('/tasks/completed', TaskController.getTasksByCompleted);
app.patch('/tasks/:id/complete', TaskController.completeTask);

describe('TaskController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a task', async () => {
    const dto: TaskDTO = { title: 'Test Task', completed: false };
    (TaskService.prototype.createTask as jest.Mock).mockResolvedValue({ id: '1', ...dto });

    const res = await request(app).post('/tasks').send(dto);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: '1', ...dto });
  });

  it('should get all tasks', async () => {
    const tasks = [{ id: '1', title: 'Task 1', completed: false }];
    (TaskService.prototype.getAllTasks as jest.Mock).mockResolvedValue(tasks);

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(tasks);
  });

  it('should get task by id', async () => {
    const task = { id: '1', title: 'Task 1', completed: false };
    (TaskService.prototype.getTaskById as jest.Mock).mockResolvedValue(task);

    const res = await request(app).get('/tasks/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(task);
  });

  it('should return 404 if task not found', async () => {
    (TaskService.prototype.getTaskById as jest.Mock).mockRejectedValue(new Error('Task not found'));

    const res = await request(app).get('/tasks/999');

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Task not found');
  });

  it('should update a task', async () => {
    const updatedTask = { id: '1', title: 'Updated', completed: true };
    (TaskService.prototype.updateTask as jest.Mock).mockResolvedValue(updatedTask);

    const res = await request(app).put('/tasks/1').send({ title: 'Updated', completed: true });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedTask);
  });

  it('should delete a task', async () => {
    (TaskService.prototype.deleteTask as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete('/tasks/1');

    expect(res.status).toBe(204);
  });

  it('should mark a task as completed', async () => {
    const task = { id: '1', title: 'Task', completed: true };
    (TaskService.prototype.markAsCompleted as jest.Mock).mockResolvedValue(task);

    const res = await request(app).patch('/tasks/1/complete');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(task);
  });
});
