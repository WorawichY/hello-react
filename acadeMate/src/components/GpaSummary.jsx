import { useSelector } from "react-redux";
import { selectStudentCount } from "../features/students/studentsSlice";
import { selectAverageGpa, selectHighAchieversCount } from "../features/students/selectors";

function GpaSummary() {
    const count = useSelector(selectStudentCount);
    const avgGpa = useSelector(selectAverageGpa);
    const highAchieversCount = useSelector(selectHighAchieversCount);

    return (
        <div className="gpa-summary">
            <div className="stat-card">
                <span className="stat-label">Total Students</span>
                <span className="stat-value">{count}</span>
            </div>
            <div className="stat-card highlight">
                <span className="stat-label">Average Class GPA</span>
                <span className="stat-value">{avgGpa}</span>
            </div>
            <div className="stat-card">
                <span className="stat-label">High Achievers (≥3.5)</span>
                <span className="stat-value">{highAchieversCount}</span>
            </div>
        </div>
    );
}

export default GpaSummary;