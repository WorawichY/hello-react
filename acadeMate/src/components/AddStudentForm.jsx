import { useState } from "react";

function AddStudentForm({ onAddStudent, courses = [] }) {
  const [formData, setFormData] = useState({ 
    name: "", 
    studentId: "", 
    major: "", 
    courseId: "" 
  });
  const [error, setError] = useState("");

  // Dynamically get unique departments from the course list
  const departments = [...new Set(courses.map(c => c.dept))].filter(Boolean);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.studentId.trim() || !formData.major) {
      setError("Name, ID, and Major are required! ⚠️");
      return;
    }

    onAddStudent({
      id: Date.now(),
      name: formData.name.trim(),
      studentId: formData.studentId.trim(),
      major: formData.major,
      initialCourseId: formData.courseId ? Number(formData.courseId) : null
    });

    setFormData({ name: "", studentId: "", major: "", courseId: "" });
    setError("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>✨ Add New Student</h3>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <input
          name="name"
          placeholder="👤 Full Name *"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="studentId"
          placeholder="🆔 Student ID *"
          value={formData.studentId}
          onChange={handleChange}
        />
        <select 
          name="major" 
          value={formData.major} 
          onChange={handleChange}
        >
          <option value="">🎓 Select Major *</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
          {departments.length === 0 && <option disabled>Please add a course first</option>}
        </select>
        
        <select 
          name="courseId" 
          value={formData.courseId} 
          onChange={handleChange}
        >
          <option value="">📚 Enroll in Subject</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.code}: {course.title}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-primary">
          🚀 Add Student
        </button>
      </div>
    </form>
  );
}
export default AddStudentForm;
