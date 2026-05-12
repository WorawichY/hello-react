import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, updateStudent, selectAllStudents } from "../features/students/studentsSlice";
import { selectStudentWithComputedGpaById, selectStudentsStatus } from "../features/students/selectors";

function StudentRow({ id, index, onDelete }) {
    const dispatch = useDispatch();
    const student = useSelector(state => selectStudentWithComputedGpaById(state, id));
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(null);
    
    if (!student) return null;

    const handleEdit = () => {
        setEditForm({ ...student });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        dispatch(updateStudent(editForm));
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <tr className="editing-row">
                <td>{index + 1}</td>
                <td>
                    <img 
                        src={student.avatar} 
                        alt={student.name} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                </td>
                <td><input name="name" value={editForm.name} onChange={handleChange} className="inline-edit-input" /></td>
                <td><input name="studentId" value={editForm.studentId} onChange={handleChange} className="inline-edit-input" /></td>
                <td><input name="major" value={editForm.major} onChange={handleChange} className="inline-edit-input" /></td>
                <td>—</td>
                <td>—</td>
                <td>
                    <div className="action-cell">
                        <button className="btn-action save" onClick={handleSave}>Save</button>
                        <button className="btn-action cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <tr className={student.computedGpa >= 3.5 ? 'high-performance' : ''}>
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
                    <button className="btn-action edit" onClick={handleEdit}>Edit</button>
                    <button className="btn-action delete" onClick={() => onDelete(student.id)}>Delete</button>
                </div>
            </td>
        </tr>
    );
}

function StudentTable() {
    const dispatch = useDispatch();
    const students = useSelector(selectAllStudents);
    const status = useSelector(selectStudentsStatus);

    function handleDelete(id) {
        if (window.confirm("Delete this student?")) {
            dispatch(deleteStudent(id));
        }
    }

    if (status === 'loading' && students.length === 0) {
        return (
            <div className="empty-state">
                <div className="spinner" style={{ width: '30px', height: '30px', margin: '0 auto 1rem' }}></div>
                <p>Loading students...</p>
            </div>
        );
    }

    if (students.length === 0) {
        return <p className="empty-state">No students found. Add one to get started!</p>;
    }

    return (
        <div className="table-container">
            {status === 'loading' && students.length > 0 && (
                <div className="table-overlay">
                    <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
                    <p className="loading-text">Updating list...</p>
                </div>
            )}
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
                            <StudentRow 
                                key={student.id} 
                                id={student.id} 
                                index={index} 
                                onDelete={handleDelete} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentTable;