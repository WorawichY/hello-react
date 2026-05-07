import './App.css';
import { useState } from 'react';
import StudentRoot from './components/StudentRoot';
import CoursesRoot from './components/CoursesRoot';
import GradesRoot from './components/GradesRoot';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllStudents, addStudent, deleteStudent, updateStudent } from './features/students/studentsSlice';
import { selectAllCourses, addCourse, deleteCourse } from './features/courses/coursesSlice';
import { selectAllGrades, addGrade, deleteGrade } from './features/grades/gradesSlice';

function App() {
  const dispatch = useDispatch();
  const students = useSelector(selectAllStudents);
  const courses = useSelector(selectAllCourses);
  const grades = useSelector(selectAllGrades);
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeRoot, setActiveRoot] = useState('students');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌸 AcadeMate 🌳</h1>
        <p>Academic Management with a touch of Sakura</p>
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
          <StudentRoot
            students={students}
            editingStudent={editingStudent}
            onAddStudent={(formData) => {
              const newStudent = { ...formData, id: Date.now() };
              dispatch(addStudent(newStudent));
            }}
            onSaveStudent={(formData) => {
              dispatch(updateStudent(formData));
              setEditingStudent(null);
            }}
            onCancelEdit={() => setEditingStudent(null)}
            onEditStudent={(student) => setEditingStudent(student)}
            onDeleteStudent={(id) => dispatch(deleteStudent(id))}
          />
        ) : activeRoot === 'grades' ? (
          <GradesRoot
            students={students}
            courses={courses}
            grades={grades}
            onAddGrade={(gradeData) => dispatch(addGrade(gradeData))}
            onDeleteGrade={(id) => dispatch(deleteGrade(id))}
          />
        ) : (
          <CoursesRoot
            courses={courses}
            onAddCourse={(courseData) => dispatch(addCourse(courseData))}
            onDeleteCourse={(id) => dispatch(deleteCourse(id))}
          />
        )}
      </main>
    </div>
  );
}
export default App;