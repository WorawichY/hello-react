import { useSelector, useDispatch } from "react-redux";
import { addStudent, deleteStudent } from "../features/students/studentsSlice";
import { addGrade } from "../features/grades/gradesSlice";
import GpaSummary from "../components/GpaSummary";
import StudentTable from "../components/StudentTable";
import AddStudentForm from "../components/AddStudentForm";

function HomePage() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const grades = useSelector((state) => state.grades.list);
  const courses = useSelector((state) => state.courses.list);

  // Conversion logic for GPA
  const gradeToPoints = { 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 };

  // Calculate dynamic GPAs
  const studentsWithUpdatedGpa = students.map(student => {
    const studentGrades = grades.filter(g => g.studentId === student.id);
    
    if (studentGrades.length === 0) {
      return { ...student, gpa: student.gpa || 0 }; 
    }

    const totalPoints = studentGrades.reduce((sum, g) => sum + (gradeToPoints[g.grade] || 0), 0);
    const calculatedGpa = totalPoints / studentGrades.length;

    return { ...student, gpa: calculatedGpa };
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleAdd = (newStudentData) => {
    const { initialCourseId, ...studentInfo } = newStudentData;
    
    // 1. Add the student
    dispatch(addStudent(studentInfo));

    // 2. If a course was selected, enroll them (create a grade record with 'F' or '-' as placeholder)
    if (initialCourseId) {
      dispatch(addGrade({
        studentId: studentInfo.id,
        courseId: initialCourseId,
        grade: "F", // Default starting grade
        score: 0
      }));
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>
      
      <GpaSummary students={studentsWithUpdatedGpa} />
      
      <div className="section-container" style={{marginBottom: '2rem'}}>
        <AddStudentForm onAddStudent={handleAdd} courses={courses} />
      </div>

      <div className="section-container">
        <StudentTable students={studentsWithUpdatedGpa} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default HomePage;
