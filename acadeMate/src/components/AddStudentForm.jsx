import { useState } from "react";
import { useAddStudentMutation } from "../features/students/studentsApi";

const EMPTY_FORM = { name: "", avatar: "", studentId: "", major: "" };

function AddStudentForm() {
    const [addStudent, { isLoading }] = useAddStudentMutation();
    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name.trim() || !form.studentId.trim()) {
            setError("Name and Student ID are required.");
            return;
        }
        try {
            await addStudent({
                name: form.name.trim(),
                avatar: form.avatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name.trim())}&background=random`,
                studentId: Number(form.studentId),
                major: form.major.trim() || "Undeclared",
            }).unwrap();
            setForm(EMPTY_FORM);
            setError("");
        } catch {
            setError("Failed to enroll student. Please try again.");
        }
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Enroll New Student</h3>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" />
                <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL (optional)" />
                <input name="studentId" type="number" placeholder="Student ID (Number) *" value={form.studentId} onChange={handleChange} />
                <input name="major" placeholder="Major (e.g. Computer Science)" value={form.major} onChange={handleChange} />
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Enrolling...' : '+ Enroll Student'}
                </button>
            </div>
        </form>
    );
}

export default AddStudentForm;
