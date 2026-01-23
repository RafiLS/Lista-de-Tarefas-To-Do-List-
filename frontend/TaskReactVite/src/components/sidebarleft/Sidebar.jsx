import "./Sidebar.css";

export default function Sidebar() {
    const handleCreate = () => {
        console.log("Create task");
        // fetch("/api/tasks", { method: "POST" })
    };

    const handleList = () => {
        console.log("List tasks");
        // fetch("/api/tasks")
    };

    const handleComplete = () => {
        console.log("Mark as completed");
        // fetch("/api/tasks/1", { method: "PUT" })
    };

    const handleRemove = () => {
        console.log("Remove task");
        // fetch("/api/tasks/1", { method: "DELETE" })
    };

    return (
        <aside className="sidebar">
            { }
            <h1 className="sidebar-title">Functionalities</h1>
            <div className="sidebar-separator"></div>

            { }
            <ul>
                <li>
                    <button onClick={handleCreate}>Create task</button>
                </li>
                <li>
                    <button onClick={handleList}>List tasks</button>
                </li>
                <li>
                    <button onClick={handleComplete}>Mark as completed</button>
                </li>
                <li>
                    <button onClick={handleRemove}>Remove task</button>
                </li>
            </ul>
        </aside>
    );
}
