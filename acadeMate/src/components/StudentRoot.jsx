import GpaSummary from './GpaSummary';
import AddStudentForm from './AddStudentForm';
import StudentTable from './StudentTable';

function StudentRoot() {
  return (
    <div className="students-root">
      <GpaSummary />
      <AddStudentForm />
      <StudentTable />
    </div>
  );
}

export default StudentRoot;
