import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStudents } from '../features/students/studentsThunks';
import GpaSummary from './GpaSummary';
import AddStudentForm from './AddStudentForm';
import StudentTable from './StudentTable';

function StudentRoot() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="students-root">
      <GpaSummary />
      <AddStudentForm />
      <StudentTable />
    </div>
  );
}

export default StudentRoot;