import AddCourseForm from './AddCourseForm';
import CourseList from './CourseList';

function CoursesRoot() {
  return (
    <div className="courses-root">
      <AddCourseForm />
      <CourseList />
    </div>
  );
}

export default CoursesRoot;
