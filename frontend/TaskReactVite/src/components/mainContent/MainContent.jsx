import "./MainContent.css";
import TaskTable from "../taskTable/TaskTable";

export default function MainContent() {
  return (
    <main className="main">
      <h1>Painel Central</h1>
      <div className="cards">
         <TaskTable />
      </div>

    </main>
  );
}