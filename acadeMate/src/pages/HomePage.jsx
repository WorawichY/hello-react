import { useSelector, useDispatch } from "react-redux";
import { addStudent, deleteStudent } from "../features/students/studentsSlice";
import GpaSummary from "../components/GpaSummary";
import StudentTable from "../components/StudentTable";
import AddStudentForm from "../components/AddStudentForm";

function HomePage() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleAdd = (newStudent) => {
    dispatch(addStudent(newStudent));
  };

  return (
    <>
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>
      
      <GpaSummary students={students} />
      
      <div className="section-container" style={{marginBottom: '2rem'}}>
        <AddStudentForm onAddStudent={handleAdd} />
      </div>

      <div className="section-container">
        <StudentTable students={students} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default HomePage;
