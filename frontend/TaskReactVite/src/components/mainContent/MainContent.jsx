import "./MainContent.css";
import TaskTable from "../taskTable/TaskTable";

export default function MainContent() {
  return (
    <main className="main">
      <h1>Lista de Tarefas</h1>
      <div className="cards">
         <TaskTable />
      </div>

    </main>
  );
}