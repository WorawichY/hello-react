import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourses } from '../features/courses/coursesThunks';
import AddCourseForm from './AddCourseForm';
import CourseList from './CourseList';

function CoursesRoot() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  return (
    <div className="courses-root">
      <AddCourseForm />
      <CourseList />
    </div>
  );
}

export default CoursesRoot;
