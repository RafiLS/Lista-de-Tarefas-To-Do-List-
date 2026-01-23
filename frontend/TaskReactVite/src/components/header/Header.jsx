import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Lista de Tarefas (To-Do List)</div>

      <nav className="header-actions">
        <span className="user">Admin</span>
      </nav>
    </header>
  );
}