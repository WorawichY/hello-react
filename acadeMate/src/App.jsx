import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import EditStudentPage from "./pages/EditStudentPage";
import CoursesPage from "./pages/CoursesPage";
import GradesPage from "./pages/GradesPage";

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <Router>
      <div className="app-shell">
        <nav className="navbar">
          <div className="navbar-container">
            <h1 className="navbar-logo">🎓 AcadeMate</h1>
            <div className="navbar-links">
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                👥 Students
              </NavLink>
              <NavLink to="/courses" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                📚 Courses
              </NavLink>
              <NavLink to="/grades" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                📝 Grades
              </NavLink>
            </div>
            <div className="navbar-actions">
              <button 
                className="theme-toggle" 
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </nav>
        <div className="app-container">
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/edit/:id" element={<EditStudentPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/grades" element={<GradesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
