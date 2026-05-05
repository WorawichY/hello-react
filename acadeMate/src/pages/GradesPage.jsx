import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGrade, deleteGrade } from "../features/grades/gradesSlice";

function GradesPage() {
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.grades.list);
  const students = useSelector((state) => state.students.list);
  const courses = useSelector((state) => state.courses.list);

  const [formData, setFormData] = useState({ studentId: "", courseId: "", score: "" });

  // Calculation Logic: Score (0-100) -> Grade (A-F)
  const calculateGrade = (score) => {
    const s = parseFloat(score);
    if (s >= 80) return "A";
    if (s >= 70) return "B";
    if (s >= 60) return "C";
    if (s >= 50) return "D";
    return "F";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId || !formData.score) return;
    
    const calculatedGrade = calculateGrade(formData.score);
    
    dispatch(addGrade({
      studentId: Number(formData.studentId),
      courseId: Number(formData.courseId),
      grade: calculatedGrade, 
      score: Number(formData.score)
    }));
    setFormData({ studentId: "", courseId: "", score: "" });
  };

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <h2>📝 Grade Records</h2>
      </div>

      <div className="section-container" style={{marginBottom: '2rem'}}>
        <form className="add-form" onSubmit={handleSubmit}>
          <h3>✨ Record New Grade</h3>
          <div className="form-row">
            <select 
              value={formData.studentId} 
              onChange={e => setFormData({...formData, studentId: e.target.value})}
            >
              <option value="">👤 Select Student</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select 
              value={formData.courseId} 
              onChange={e => setFormData({...formData, courseId: e.target.value})}
            >
              <option value="">📚 Select Course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <input 
              placeholder="Score (0-100)" 
              type="number"
              min="0"
              max="100"
              value={formData.score} 
              onChange={e => setFormData({...formData, score: e.target.value})}
            />
            <button type="submit" className="btn-primary">🚀 Save Grade</button>
          </div>
        </form>
      </div>

      <div className="section-container">
        {grades.length === 0 ? (
          <p className="empty-state">No grade records yet. Connect students to courses!</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td>{getStudentName(grade.studentId)}</td>
                  <td>{getCourseTitle(grade.courseId)}</td>
                  <td style={{fontWeight: 700}}>{grade.score || "-"}</td>
                  <td style={{fontWeight: 900, color: 'var(--primary)', fontSize: '1.1rem'}}>{grade.grade}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleDelete(grade.id)} className="btn-delete">
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GradesPage;
