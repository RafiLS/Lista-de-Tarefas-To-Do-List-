import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);

const MONGO_URI = 'mongodb://localhost:27017/taskdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
