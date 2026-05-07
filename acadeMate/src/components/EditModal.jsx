import { useState } from 'react';

function EditModal({ student, onSave, onCancel }) {
    const [form, setForm] = useState({ ...student });

    const onChange = e =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Student Details</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Name</label>
                        <input className="form-row input" name="name" value={form.name} onChange={onChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Major</label>
                        <input className="form-row input" name="major" value={form.major} onChange={onChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        GPA is calculated automatically from grades.
                    </p>
                    <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                        <button type="button" className="btn-action" onClick={onCancel} style={{ background: '#f1f5f9', color: 'var(--text-main)' }}>Cancel</button>
                        <button type="submit" className="btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;