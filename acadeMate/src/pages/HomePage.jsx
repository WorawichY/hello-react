import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStudent } from "../features/students/studentsSlice";
import GpaSummary from "../components/GpaSummary";
import StudentTable from "../components/StudentTable";

function HomePage() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>Student Dashboard</h2>
        <Link to="/add" className="btn-primary">
          + Add New Student
        </Link>
      </div>
      
      <GpaSummary students={students} />
      
      <div className="section-container">
        <StudentTable students={students} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default HomePage;
