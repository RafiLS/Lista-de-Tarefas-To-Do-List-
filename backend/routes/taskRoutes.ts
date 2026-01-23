import { Router } from 'express';
import { TaskController } from '../controller/TaskController';

const router = Router();

// Routes CRUD
router.post('/', TaskController.createTask);
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.get('/filter/completed', TaskController.getTasksByCompleted);

export default router;
