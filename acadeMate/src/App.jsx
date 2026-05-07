import './App.css';
import { useState } from 'react';
import StudentRoot from './components/StudentRoot';
import CoursesRoot from './components/CoursesRoot';
import GradesRoot from './components/GradesRoot';

function App() {
  const [activeRoot, setActiveRoot] = useState('students');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Professional Academic Management & Performance Analytics
        </p>
      </header>
      <main className="app-main">
        <div className="root-nav">
          <button
            className={activeRoot === 'students' ? 'tab active' : 'tab'}
            onClick={() => setActiveRoot('students')}
          >
            Students
          </button>
          <button
            className={activeRoot === 'grades' ? 'tab active' : 'tab'}
            onClick={() => setActiveRoot('grades')}
          >
            Grades
          </button>
          <button
            className={activeRoot === 'courses' ? 'tab active' : 'tab'}
            onClick={() => setActiveRoot('courses')}
          >
            Courses
          </button>
        </div>
        {activeRoot === 'students' ? (
          <StudentRoot />
        ) : activeRoot === 'grades' ? (
          <GradesRoot />
        ) : (
          <CoursesRoot />
        )}
      </main>
    </div>
  );
}
export default App;