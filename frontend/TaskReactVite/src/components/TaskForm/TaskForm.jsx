import { useState } from 'react';
import { TaskService } from '../../services/taskService';
import './TaskForm.css';

export function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('O campo tem de ser preenchido');
      return;
    }

    setErrorMessage(''); // limpa mensagem se estiver preenchido
    setLoading(true);

    try {
      await TaskService.createTask({ title });
      setTitle('');
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      console.error(error);
      alert('Erro ao criar tarefa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}
