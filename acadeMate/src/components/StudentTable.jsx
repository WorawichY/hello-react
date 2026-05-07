import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, updateStudent } from "../features/students/studentsSlice";
import { selectStudentsWithComputedGpa } from "../features/students/selectors";
import EditModal from "./EditModal";

function StudentTable() {
    const dispatch = useDispatch();
    const students = useSelector(selectStudentsWithComputedGpa);
    const [editing, setEditing] = useState(null);

    function handleDelete(id) {
        if (window.confirm("Delete this student?")) {
            dispatch(deleteStudent(id));
        }
    }

    function handleEditSave(updatedData) {
        dispatch(updateStudent({ ...updatedData }));
        setEditing(null);
    }

    if (students.length === 0) {
        return <p className="empty-state">No students found. Add one to get started!</p>;
    }

    return (
        <>
            <div className="students-card">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Student ID</th>
                            <th>Major</th>
                            <th>Computed GPA</th>
                            <th>Enrolled Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id} className={student.computedGpa >= 3.5 ? 'high-performance' : ''}>
                                <td>{index + 1}</td>
                                <td>
                                    {student.avatar ? (
                                        <img 
                                            src={student.avatar} 
                                            alt={student.name} 
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} 
                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random` }}
                                        />
                                    ) : (
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
                                    )}
                                </td>
                                <td><strong>{student.name}</strong></td>
                                <td>{student.studentId}</td>
                                <td>{student.major}</td>
                                <td className="gpa-cell">
                                    <span className={`gpa-badge ${student.computedGpa >= 3.5 ? 'high' : ''}`}>
                                        {student.computedGpa.toFixed(2)}
                                    </span>
                                </td>
                                <td>{student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    <div className="action-cell">
                                        <button className="btn-action edit" onClick={() => setEditing(student)}>Edit</button>
                                        <button className="btn-action delete" onClick={() => handleDelete(student.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editing && (
                <EditModal 
                    student={editing} 
                    onSave={handleEditSave} 
                    onCancel={() => setEditing(null)} 
                />
            )}
        </>
    );
}

export default StudentTable;