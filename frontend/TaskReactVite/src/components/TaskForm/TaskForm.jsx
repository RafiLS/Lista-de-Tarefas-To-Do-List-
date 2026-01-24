import { useState } from 'react';
import { TaskService } from '../../services/taskService';
import './TaskForm.css';
import { useTranslation } from "react-i18next";

export function TaskForm({ onTaskCreated }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage(t("taskForm.titleIsRequired"));
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      await TaskService.createTask({ title });
      setTitle('');
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      console.error(error);
      alert(t("taskForm.errorCreatingTask"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t("taskForm.placeholder")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? t("taskForm.saving...") : t("taskForm.save")}
      </button>
    </form>
  );
}
