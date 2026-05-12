import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentRoot from './components/StudentRoot';
import CoursesRoot from './components/CoursesRoot';
import GradesRoot from './components/GradesRoot';
import { fetchStudents } from './features/students/studentsThunks';
import { fetchCourses } from './features/courses/coursesThunks';

function App() {
  const dispatch = useDispatch();
  const [activeRoot, setActiveRoot] = useState('students');
  
  const studentsStatus = useSelector(state => state.students.status);
  const coursesStatus = useSelector(state => state.courses.status);
  
  const isLoading = studentsStatus === 'loading' || coursesStatus === 'loading';

  const handleReload = () => {
    dispatch(fetchStudents());
    dispatch(fetchCourses());
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <h1>AcadeMate Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Professional Academic Management & Performance Analytics
            </p>
          </div>
          <button className="btn-reload" onClick={handleReload} disabled={isLoading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
            {isLoading ? 'Loading...' : 'Reload Data'}
          </button>
        </div>
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