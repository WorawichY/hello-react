// src/components/GpaSummary.jsx
function GpaSummary({ students }) {
  if (students.length === 0) return null;
  const average = (
    students.reduce((sum, s) => sum + s.gpa, 0) / students.length
  ).toFixed(2);
  const highest = Math.max(...students.map((s) => s.gpa)).toFixed(2);
  const lowest = Math.min(...students.map((s) => s.gpa)).toFixed(2);
  return (
    <div className="gpa-summary">
      <div className="stat-card">
        <span className="stat-label">Total Students</span>
        <div className="stat-value-container">
          <span className="stat-icon">👥</span>
          <span className="stat-value">{students.length}</span>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-label">Avg GPA</span>
        <div className="stat-value-container">
          <span className="stat-icon">📊</span>
          <span className="stat-value">{average}</span>
        </div>
      </div>
      <div className="stat-card highlight">
        <span className="stat-label">Highest GPA</span>
        <div className="stat-value-container">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">{highest}</span>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-label">Lowest GPA</span>
        <div className="stat-value-container">
          <span className="stat-icon">📉</span>
          <span className="stat-value">{lowest}</span>
        </div>
      </div>
    </div>
  );
}
export default GpaSummary;
