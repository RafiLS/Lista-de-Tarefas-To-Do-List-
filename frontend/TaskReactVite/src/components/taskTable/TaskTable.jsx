import React from "react";
import "./TaskTable.css";

export default function TaskTable() {
  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="no-data">
              Nenhuma tarefa disponível
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
