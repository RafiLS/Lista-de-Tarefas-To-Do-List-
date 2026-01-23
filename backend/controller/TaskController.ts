import { Request, Response } from 'express';
import { TaskService } from '../application/task/TaskService';
import { TaskRepository } from '../infrastructure/task/repository/TaskRepository';
import { TaskDTO } from '../application/task/TaskDTO';
import { TaskId } from '../domain/task/TaskId';

const taskRepo = new TaskRepository();
const taskService = new TaskService(taskRepo);

export class TaskController {
    static async createTask(req: Request, res: Response) {
        try {
            const { title, completed } = req.body;
            const task: TaskDTO = await taskService.createTask(title, completed);
            res.status(201).json(task);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllTasks(req: Request, res: Response) {
        try {
            const tasks: TaskDTO[] = await taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getTaskById(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const task: TaskDTO = await taskService.getTaskById(id);
            res.status(200).json(task);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    static async updateTask(req: Request, res: Response) {
        try {
            const idParam = req.params.id;
            if (!idParam || Array.isArray(idParam)) {
                return res.status(400).json({ message: 'Invalid task ID' });
            }

            const { title, completed } = req.body;

            const updated: TaskDTO = await taskService.updateTask(idParam, title, completed);
            res.status(200).json(updated);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteTask(req: Request, res: Response) {
        try {
            const idParam = req.params.id;
            if (!idParam || Array.isArray(idParam)) {
                return res.status(400).json({ message: 'Invalid task ID' });
            }

            await taskService.deleteTask(idParam);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }


    static async getTasksByCompleted(req: Request, res: Response) {
        try {
            const completed = req.query.completed === 'true';
            const tasks: TaskDTO[] = await taskService.getTasksByCompleted(completed);
            res.status(200).json(tasks);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
