import { useSelector } from "react-redux";
import { selectAllStudents } from "../features/students/studentsSlice";

function GpaSummary() {
    const students = useSelector(selectAllStudents);
    const count = students.length;
    const avgGpa = students.length > 0 ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2) : "0.00";
    const highAchievers = students.filter(s => s.gpa >= 3.5).length;

    return (
        <div className="gpa-summary">
            <div className="stat-card">
                <span className="stat-value">{count}</span>
                <span className="stat-label">Total Students</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{avgGpa}</span>
                <span className="stat-label">Average GPA</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{highAchievers}</span>
                <span className="stat-label">High Achievers (≥3.5)</span>
            </div>
        </div>
    );
}
export default GpaSummary;