import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

export const TaskService = {
  createTask: async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  },

  getAllTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateTask: async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  getCompletedTasks: async () => {
    const response = await axios.get(`${API_URL}/filter/completed`);
    return response.data;
  },

  completeTask: async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/complete`);
    return response.data;
  },
};
