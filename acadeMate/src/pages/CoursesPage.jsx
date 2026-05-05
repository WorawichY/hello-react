import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse } from "../features/courses/coursesSlice";

function CoursesPage() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list);
  
  const [formData, setFormData] = useState({ code: "", title: "", credits: "", dept: "" });

  const handleDelete = (id) => {
    if (window.confirm("Delete this course?")) {
      dispatch(deleteCourse(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title) return;
    dispatch(addCourse({
      id: Date.now(),
      ...formData,
      credits: parseInt(formData.credits) || 0
    }));
    setFormData({ code: "", title: "", credits: "", dept: "" });
  };

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <h2>📚 Course Catalog</h2>
      </div>

      <div className="section-container" style={{marginBottom: '2rem'}}>
        <form className="add-form" onSubmit={handleSubmit}>
          <h3>✨ Add New Course</h3>
          <div className="form-row">
            <input 
              placeholder="Code (e.g. CS101)" 
              value={formData.code} 
              onChange={e => setFormData({...formData, code: e.target.value})}
            />
            <input 
              placeholder="Title" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <input 
              placeholder="Credits" 
              type="number"
              value={formData.credits} 
              onChange={e => setFormData({...formData, credits: e.target.value})}
            />
            <input 
              placeholder="Dept" 
              value={formData.dept} 
              onChange={e => setFormData({...formData, dept: e.target.value})}
            />
            <button type="submit" className="btn-primary">🚀 Add Course</button>
          </div>
        </form>
      </div>

      <div className="section-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td style={{fontWeight: 800}}>{course.code}</td>
                <td>{course.title}</td>
                <td>{course.credits}</td>
                <td>{course.dept}</td>
                <td className="actions-cell">
                   <button onClick={() => handleDelete(course.id)} className="btn-delete">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoursesPage;
