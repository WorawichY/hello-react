export const selectAllStudents = (state) => state.students.list;
export const selectAllGrades = (state) => state.grades.list;
export const selectAllCourses = (state) => state.courses.list;

// Helper to calculate GPA for a student
const getStudentGpa = (studentId, grades, courses) => {
    const studentGrades = grades.filter(g => g.studentId === studentId || g.studentId === studentId.toString() || g.studentId === Number(studentId));
    if (studentGrades.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    studentGrades.forEach(gradeEntry => {
        const course = courses.find(c => c.id === gradeEntry.courseId || c.id === gradeEntry.courseId.toString() || c.id === Number(gradeEntry.courseId));
        if (course) {
            const credit = Number(course.credit || course.credits || 0);
            totalPoints += Number(gradeEntry.grade) * credit;
            totalCredits += credit;
        }
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

// Select all students with their computed GPA
export const selectStudentsWithComputedGpa = (state) => {
    const students = state.students.list;
    const grades = state.grades.list;
    const courses = state.courses.list;

    return students.map(student => ({
        ...student,
        computedGpa: getStudentGpa(student.id, grades, courses)
    }));
};

export const selectAverageGpa = (state) => {
    const studentsWithGpa = selectStudentsWithComputedGpa(state);
    if (studentsWithGpa.length === 0) return "0.00";
    const total = studentsWithGpa.reduce((sum, s) => sum + s.computedGpa, 0);
    return (total / studentsWithGpa.length).toFixed(2);
};

export const selectHighAchieversCount = (state) => {
    const studentsWithGpa = selectStudentsWithComputedGpa(state);
    return studentsWithGpa.filter(s => s.computedGpa >= 3.5).length;
};

export const selectStudentCount = (state) => state.students.list.length;
