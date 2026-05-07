import { useState } from 'react';
function EditModal({ student, onSave, onCancel }) {
    // Local copy of student data — what the user edits before saving
    const [form, setForm] = useState({ ...student });
    const onChange = e =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Edit Student</h3>
                <input name="name" value={form.name} onChange={onChange} />
                <input name="major" value={form.major} onChange={onChange} />
                <input name="gpa" value={form.gpa} onChange={onChange} type="number" step="0.01" />
                <div className="modal-actions">
                    <button onClick={() => onSave(form)}>Save</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default EditModal;