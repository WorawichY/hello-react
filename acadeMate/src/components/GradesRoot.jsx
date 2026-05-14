import { useSelector } from 'react-redux';
import { selectAllGrades } from '../features/grades/gradesSlice';
import AddGradeForm from './AddGradeForm';
import GradeList from './GradeList';

function GradesRoot() {
    const grades = useSelector(selectAllGrades);

    const calculateAverage = () => {
        if (grades.length === 0) return 0;
        return (grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length).toFixed(2);
    };

    return (
        <div className="grades-root">
            <div className="gpa-summary">
                <div className="stat-card">
                    <span className="stat-label">Total Grade Entries</span>
                    <span className="stat-value">{grades.length}</span>
                </div>
                <div className="stat-card highlight">
                    <span className="stat-label">Class Avg Performance</span>
                    <span className="stat-value">{calculateAverage()}</span>
                </div>
            </div>
            <AddGradeForm />
            <GradeList />
        </div>
    );
}

export default GradesRoot;
