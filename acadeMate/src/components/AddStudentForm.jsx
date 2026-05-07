import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../features/students/studentsSlice";
const EMPTY_FORM = { name: "", avatar: "", studentId: "", major: "" };
function AddStudentForm() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState("");
    // Single handler for ALL inputs via computed property name
    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!form.name.trim() || !form.studentId.trim()) {
            setError("Name and Student ID are required.");
            return;
        }
        dispatch(addStudent({
            id: Date.now().toString(),
            name: form.name.trim(),
            avatar: form.avatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name.trim())}&background=random`,
            studentId: Number(form.studentId),
            major: form.major.trim() || "Undeclared",
            gpa: 0 // Initialize for API compatibility if needed
        }));
        setForm(EMPTY_FORM);
        setError("");
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Enroll New Student</h3>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required />
                <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL (optional)" />
                <input name="studentId" type="number" placeholder="Student ID (Number) *" value={form.studentId} onChange={handleChange} required />
                <input name="major" placeholder="Major (e.g. Computer Science)" value={form.major} onChange={handleChange} />
                <button type="submit" className="btn-primary">
                    + Enroll Student
                </button>
            </div>
        </form>
    );
}
export default AddStudentForm;