import "./Sidebar.css";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
    const { t } = useTranslation();
    const handleCreate = () => {
        console.log("Criar tarefa");
    };

    const handleList = () => {
        console.log("Listar tarefas");
    };

    const handleComplete = () => {
        console.log("Marcar como concluída");
    };

    const handleRemove = () => {
        console.log("Remover tarefa");
    };

    return (
        <aside className="sidebar">
            { }
            <h1 className="sidebar-title">{t("sidebar.features")}</h1>
            <div className="sidebar-separator"></div>

            { }
            <ul>
                <li>
                    <button onClick={handleCreate}>{t("sidebar.createTask")}</button>
                </li>
                <li>
                    <button onClick={handleList}>{t("sidebar.listTasks")}</button>
                </li>
                <li>
                    <button onClick={handleComplete}>{t("sidebar.completeTask")}</button>
                </li>
                <li>
                    <button onClick={handleRemove}>{t("sidebar.removeTask")}</button>
                </li>
            </ul>
        </aside>
    );
}
