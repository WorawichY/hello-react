import { useSelector, useDispatch } from 'react-redux';
import { selectAllCourses, deleteCourse } from '../features/courses/coursesSlice';

function CourseList() {
    const dispatch = useDispatch();
    const courses = useSelector(selectAllCourses);

    if (courses.length === 0) {
        return <p className="empty-state">No courses available. Add one above!</p>;
    }

    return (
        <div className="courses-card">
            <h2>Course Catalog</h2>
            <p className="course-count">Total courses: {courses.length}</p>
            <table className="course-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Credit</th>
                        <th>Instructor</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={course.id}>
                            <td>{index + 1}</td>
                            <td><strong>{course.code}</strong></td>
                            <td>{course.title}</td>
                            <td>{course.credit}</td>
                            <td>{course.instructor}</td>
                            <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button type="button" className="btn-action delete" onClick={() => dispatch(deleteCourse(course.id))}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseList;
