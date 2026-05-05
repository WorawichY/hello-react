import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../features/students/studentsSlice";
import AddStudentForm from "../components/AddStudentForm";

function AddStudentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddStudent = (newStudent) => {
    dispatch(addStudent(newStudent));
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Add New Student</h2>
        <button onClick={() => navigate("/")} className="btn-secondary">
          Back to List
        </button>
      </div>
      <AddStudentForm onAddStudent={handleAddStudent} />
    </div>
  );
}

export default AddStudentPage;
