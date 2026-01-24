import './App.css'
import Sidebar from "./components/sidebarleft/Sidebar";
import MainContent from "./components/mainContent/MainContent";
import Header from "./components/header/Header";
import './i18n';

function App() {
  return (
    <div className="app">
      <Header />

      <div className="app-body">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default App
