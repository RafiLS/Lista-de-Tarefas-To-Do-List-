import express = require('express');
import mongoose = require('mongoose');
import cors = require('cors');
import dotenv = require('dotenv');

import { TaskController } from './controller/TaskController';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb';

// Route test
app.get('/', (req, res) => res.send('Servidor Express funcionando!'));

// ===== CRUD =====
app.post('/tasks', TaskController.createTask);
app.get('/tasks', TaskController.getAllTasks);
app.get('/tasks/:id', TaskController.getTaskById);
app.put('/tasks/:id', TaskController.updateTask);
app.delete('/tasks/:id', TaskController.deleteTask);
app.get('/tasks/filter/completed', TaskController.getTasksByCompleted);
app.patch('/tasks/:id/complete', TaskController.completeTask);

// ===== Connection MongoDB =====
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error while connecting to MongoDB:', err));
