import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../features/courses/coursesSlice';

const EMPTY_FORM = { code: '', title: '', credits: '', dept: '' };

function AddCourseForm() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.code.trim() || !formData.title.trim()) {
            setError('Course code and title are required.');
            return;
        }
        const creditsNum = parseInt(formData.credits, 10);
        if (isNaN(creditsNum) || creditsNum <= 0) {
            setError('Credits must be a positive number.');
            return;
        }

        dispatch(addCourse({
            id: Date.now(),
            code: formData.code.trim().toUpperCase(),
            title: formData.title.trim(),
            credits: creditsNum,
            dept: formData.dept.trim() || 'General',
        }));

        setFormData(EMPTY_FORM);
        setError('');
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Add New Course</h3>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
                <input name="code" placeholder="Course Code *" value={formData.code} onChange={handleChange} />
                <input name="title" placeholder="Course Title *" value={formData.title} onChange={handleChange} />
                <input name="credits" placeholder="Credits" type="number" min="1" value={formData.credits} onChange={handleChange} />
                <input name="dept" placeholder="Department" value={formData.dept} onChange={handleChange} />
                <button type="submit" className="btn-primary">+ Add Course</button>
            </div>
        </form>
    );
}

export default AddCourseForm;
