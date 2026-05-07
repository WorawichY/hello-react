import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../features/courses/coursesSlice';

const EMPTY_FORM = { code: '', title: '', credit: '', instructor: '' };

function AddCourseForm() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.code.trim() || !formData.title.trim() || !formData.instructor.trim()) {
            setError('Course code, title, and instructor are required.');
            return;
        }
        const creditNum = parseInt(formData.credit, 10);
        if (isNaN(creditNum) || creditNum <= 0) {
            setError('Credit must be a positive number.');
            return;
        }

        dispatch(addCourse({
            id: Date.now().toString(),
            code: formData.code.trim().toUpperCase(),
            title: formData.title.trim(),
            credit: creditNum,
            instructor: formData.instructor.trim(),
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
                <input name="credit" placeholder="Credit (Units) *" type="number" min="1" value={formData.credit} onChange={handleChange} />
                <input name="instructor" placeholder="Instructor Name *" value={formData.instructor} onChange={handleChange} />
                <button type="submit" className="btn-primary">+ Add Course</button>
            </div>
        </form>
    );
}

export default AddCourseForm;
