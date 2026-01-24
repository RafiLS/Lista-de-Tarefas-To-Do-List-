import React, { useEffect, useState } from "react";
import { TaskService } from "../../services/taskService";
import { TaskForm } from "../TaskForm/TaskForm";
import "./TaskTable.css";
import { useTranslation } from "react-i18next";

export default function TaskTable() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const data = await TaskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error(t("taskTable.taskFindingError"), error);
    }
  };

  const showTempMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCompleteTask = async (id) => {
    try {
      await TaskService.completeTask(id);
      showTempMessage(t("taskTable.completedTasks"));
      fetchTasks();
    } catch (error) {
      console.error(t("taskTable.failedToComplete"), error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      showTempMessage(t("taskTable.taskRemovedSuccessfully"));
      fetchTasks();
    } catch (error) {
      console.error(t("taskTable.failedToRemoveTask"), error);
    }
  };

  const handleAddTask = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="task-table-container">
      { }
      <div className="task-summary">
        <span>{t("taskTable.percentage")}: {completionPercentage}%</span>
        <span>{t("taskTable.completedTasks")}: {completedCount}</span>
        <span>{t("taskTable.pendingTasks")}: {pendingCount}</span>
        <span>{t("taskTable.totalTasks")}: {totalCount}</span>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>{t("taskTable.taskName")}</th>
            <th>{t("taskTable.status")}</th>
            <th>{t("taskTable.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                {t("taskTable.noTasks")}
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.completed ? t("taskTable.completed 🟢") : t("taskTable.pending 🟡")}</td>
                <td>
                  {!task.completed && (
                    <button onClick={() => handleCompleteTask(task.id)}>
                      {t("taskTable.complete")}
                    </button>
                  )}
                  <button onClick={() => handleDeleteTask(task.id)}>{t("taskTable.remove")}</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button className="add-task-button" onClick={handleAddTask}>
        +
      </button>

      {showForm && (
        <TaskForm
          onTaskCreated={() => {
            fetchTasks();
            setShowForm(false);
            showTempMessage(t("taskTable.taskCreatedSuccessfully"));
          }}
        />
      )}

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}
