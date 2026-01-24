import { Request, Response } from 'express';
import { TaskService } from '../application/task/TaskService';
import { TaskDTO } from '../application/task/TaskDTO';


export class TaskController {

   private static taskService: TaskService;

  public static setService(service: TaskService) {
    this.taskService = service;
  }
  
  static async createTask(req: Request, res: Response) {
    try {
      const dto: TaskDTO = {
        title: req.body.title,
        completed: req.body.completed
      };

      if (!dto.title)
        return res.status(400).json({ message: 'Title is required' });

      const task = await this.taskService.createTask(dto);
      res.status(201).json(task);

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const task = await this.taskService.getTaskById(req.params.id as string);
      res.status(200).json(task);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const dto: TaskDTO = { title: req.body.title, completed: req.body.completed };
      const task = await this.taskService.updateTask(req.params.id as string, dto);
      res.status(200).json(task);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      await this.taskService.deleteTask(req.params.id as string);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getTasksByCompleted(req: Request, res: Response) {
    try {
      const completed = req.query.completed === 'true';
      const tasks = await this.taskService.getTasksByCompleted(completed);
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async completeTask(req: Request, res: Response) {
  try {
    const taskIdParam = req.params.id;

    if (!taskIdParam || Array.isArray(taskIdParam)) {
      return res.status(400).json({ message: 'ID valid' });
    }

    const task: TaskDTO = await this.taskService.markAsCompleted(taskIdParam);
    res.status(200).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
}
