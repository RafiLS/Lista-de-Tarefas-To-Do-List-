import "./MainContent.css";
import TaskTable from "../taskTable/TaskTable";
import { useTranslation } from "react-i18next";

export default function MainContent() {
   const { t } = useTranslation();
  return (
    <main className="main">
      <h1>{t("mainContent.taskListTitle")}</h1>
      <div className="cards">
         <TaskTable />
      </div>
    </main>
  );
}