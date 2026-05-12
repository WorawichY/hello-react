import { useSelector } from "react-redux";
import { selectStudentCount } from "../features/students/studentsSlice";
import { selectAverageGpa, selectHighAchieversCount, selectGpaDistribution } from "../features/students/selectors";

function GpaSummary() {
    const count = useSelector(selectStudentCount);
    const avgGpa = useSelector(selectAverageGpa);
    const highAchieversCount = useSelector(selectHighAchieversCount);
    const distribution = useSelector(selectGpaDistribution);

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
            <div className="stat-card" style={{ gridColumn: '1 / -1' }}>
                <span className="stat-label">Class GPA Distribution</span>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                    <div style={{ flex: 1, padding: '0.75rem', background: '#dcfce7', borderRadius: '8px', color: '#166534', fontWeight: 600 }}>
                        High (≥3.5): {distribution.high}
                    </div>
                    <div style={{ flex: 1, padding: '0.75rem', background: '#fef08a', borderRadius: '8px', color: '#854d0e', fontWeight: 600 }}>
                        Medium (2.5-3.4): {distribution.medium}
                    </div>
                    <div style={{ flex: 1, padding: '0.75rem', background: '#fee2e2', borderRadius: '8px', color: '#991b1b', fontWeight: 600 }}>
                        Low (&lt;2.5): {distribution.low}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GpaSummary;