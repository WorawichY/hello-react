import { useState } from "react";
import "./App.css";
import GpaSummary from "./components/GpaSummary";
import AddStudentForm from "./components/AddStudentForm";
import StudentTable from "./components/StudentTable";
// Hard-coded initial data — Session 2 will move this into the Redux store
const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Somchai Rakpong",
    studentId: "6501001",
    major: "Computer Science",
    gpa: 3.85,
  },
  {
    id: 2,
    name: "Naree Thongdee",
    studentId: "6501002",
    major: "Information Technology",
    gpa: 3.6,
  },
  {
    id: 3,
    name: "Krit Suwan",
    studentId: "6501003",
    major: "Computer Science",
    gpa: 2.95,
  },
  {
    id: 4,
    name: "Malee Jaikaew",
    studentId: "6501004",
    major: "Business IT",
    gpa: 3.4,
  },
  {
    id: 5,
    name: "Pong Srisuk",
    studentId: "6501005",
    major: "Information Technology",
    gpa: 3.75,
  },
];
function App() {
  // All state lives here — App is the single source of truth (for now)
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  function handleAddStudent(newStudent) {
    setStudents([...students, newStudent]); // Immutable update — no .push()!
  }
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>
        <p>Student Academic Performance Tracker — Session 1 Prototype</p>
      </header>
      <main className="app-main">
        <GpaSummary students={students} />
        <AddStudentForm onAddStudent={handleAddStudent} />
        <StudentTable students={students} />
      </main>
    </div>
  );
}
export default App;
