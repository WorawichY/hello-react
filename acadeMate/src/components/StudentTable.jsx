import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
    useGetStudentsQuery,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
} from "../features/students/studentsApi";
import { selectAllGrades, selectAllCourses } from "../features/students/selectors";

function computeGpa(student, grades, courses) {
    const studentGrades = grades.filter(
        (g) =>
            g.studentId === student.id ||
            g.studentId === student.id.toString() ||
            g.studentId === Number(student.id)
    );
    if (studentGrades.length === 0) return 0;
    let totalPoints = 0;
    let totalCredits = 0;
    studentGrades.forEach((gradeEntry) => {
        const course = courses.find(
            (c) =>
                c.id === gradeEntry.courseId ||
                c.id === gradeEntry.courseId.toString() ||
                c.id === Number(gradeEntry.courseId)
        );
        if (course) {
            const credit = Number(course.credit || course.credits || 0);
            totalPoints += Number(gradeEntry.grade) * credit;
            totalCredits += credit;
        }
    });
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

const StudentRow = React.memo(({ student, index, grades, courses, onDelete }) => {
    const [updateStudent] = useUpdateStudentMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(null);

    const computedGpa = useMemo(
        () => computeGpa(student, grades, courses),
        [student, grades, courses]
    );

    if (!student) return null;

    const handleEdit = () => {
        setEditForm({ ...student });
        setIsEditing(true);
    };

    const handleCancel = () => setIsEditing(false);

    const handleChange = (e) =>
        setEditForm({ ...editForm, [e.target.name]: e.target.value });

    const handleSave = () => {
        updateStudent(editForm);
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
        <tr className={computedGpa >= 3.5 ? 'high-performance' : ''}>
            <td>{index + 1}</td>
            <td>
                {student.avatar ? (
                    <img
                        src={student.avatar}
                        alt={student.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`;
                        }}
                    />
                ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
                )}
            </td>
            <td><strong>{student.name}</strong></td>
            <td>{student.studentId}</td>
            <td>{student.major}</td>
            <td className="gpa-cell">
                <span className={`gpa-badge ${computedGpa >= 3.5 ? 'high' : ''}`}>
                    {computedGpa.toFixed(2)}
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
});

function StudentTable() {
    const [deleteStudent] = useDeleteStudentMutation();
    const grades = useSelector(selectAllGrades);
    const courses = useSelector(selectAllCourses);

    const {
        data: students = [],
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetStudentsQuery(undefined, {
        pollingInterval: 30_000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    });

    function handleDelete(id) {
        if (window.confirm("Delete this student?")) {
            deleteStudent(id);
        }
    }

    if (isError) {
        return <p className="empty-state" role="alert">Failed to load students. Please try again.</p>;
    }

    if (isLoading) {
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                {isFetching ? (
                    <span style={{ fontSize: 12, color: '#3A5BA0' }}>↻ Syncing...</span>
                ) : (
                    <span />
                )}
                <button className="btn-action" onClick={refetch}>↻ Refresh</button>
            </div>
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
                                student={student}
                                index={index}
                                grades={grades}
                                courses={courses}
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
