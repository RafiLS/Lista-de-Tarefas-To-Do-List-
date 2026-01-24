import React, { useEffect, useState } from "react";
import { TaskService } from "../../services/taskService";
import { TaskForm } from "../TaskForm/TaskForm";
import "./TaskTable.css";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const data = await TaskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const showTempMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCompleteTask = async (id) => {
    try {
      await TaskService.completeTask(id);
      showTempMessage("Tarefa marcada como concluída");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao completar tarefa:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      showTempMessage("Tarefa removida com sucesso");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
    }
  };

  const handleAddTask = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Nome da Tarefa</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                Nenhuma tarefa disponível
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.completed ? "Concluída 🟢" : "Pendente 🟡"}</td>
                <td>
                  {!task.completed && (
                    <button onClick={() => handleCompleteTask(task.id)}>
                      Completar
                    </button>
                  )}
                  <button onClick={() => handleDeleteTask(task.id)}>Remover</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      { }
      <button className="add-task-button" onClick={handleAddTask}>
        +
      </button>

      { }
      {showForm && <TaskForm onTaskCreated={() => {
        fetchTasks(); setShowForm(false);
        showTempMessage("Tarefa criada com sucesso");
      }} />}


      { }
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
}
