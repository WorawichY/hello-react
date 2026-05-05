import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AddStudentPage from "./pages/AddStudentPage";
import EditStudentPage from "./pages/EditStudentPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>AcadeMate — Redux & Router Edition</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddStudentPage />} />
            <Route path="/edit/:id" element={<EditStudentPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
