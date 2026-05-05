function StudentTable({ students }) {
  if (students.length === 0) {
    return <p className="empty-state">No students yet. Add one above!</p>;
  }
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Student ID</th>
          <th>Major</th>
          <th>GPA</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={student.id} className={student.gpa >= 3.5 ? "high-gpa" : ""}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>{student.studentId}</td>
            <td>{student.major}</td>
            <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default StudentTable;