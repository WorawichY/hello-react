import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateStudent } from "../features/students/studentsSlice";

function EditStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Find student from store
  const student = useSelector((state) => 
    state.students.list.find((s) => s.id === parseInt(id))
  );

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    gpa: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        studentId: student.studentId,
        major: student.major,
        gpa: student.gpa
      });
    }
  }, [student]);

  if (!student) {
    return (
      <div className="page-container">
        <h2>Student Not Found</h2>
        <button onClick={() => navigate("/")} className="btn-primary">Back to List</button>
      </div>
    );
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.studentId.trim()) {
      setError("Name and Student ID are required.");
      return;
    }
    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      setError("GPA must be a number between 0.0 and 4.0.");
      return;
    }

    dispatch(updateStudent({
      ...student,
      name: formData.name.trim(),
      studentId: formData.studentId.trim(),
      major: formData.major.trim(),
      gpa: gpaNum,
    }));
    
    navigate("/");
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Edit Student: {student.name}</h2>
        <button onClick={() => navigate("/")} className="btn-secondary">
          Cancel
        </button>
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <div className="form-group">
          <label>Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Student ID</label>
          <input
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Major</label>
          <input
            name="major"
            value={formData.major}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>GPA</label>
          <input
            name="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={formData.gpa}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditStudentPage;
