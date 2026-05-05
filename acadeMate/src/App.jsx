import "./App.css";
import StudentTable from "./components/StudentTable";
import GpaSummary from "./components/GpaSummary";
import AddStudentForm from "./components/AddStudentForm";
function App() {
  // useState IS GONE — state now lives in the Redux store.
  // Empty stubs keep the UI from crashing until Session 3
  // connects each component to Redux via useSelector.
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate — Session 2 Redux Migration</h1>
      </header>
      <main className="app-main">
        {/* Session 3: replace [] with useSelector(selectAllStudents) */}
        <GpaSummary students={[]} />
        {/* Session 3: dispatch(addStudent(formData)) */}
        <AddStudentForm onAddStudent={() => {}} />
        {/* Session 3: replace [] with useSelector(selectAllStudents) */}
        <StudentTable students={[]} />
      </main>
    </div>
  );
}
export default App;
