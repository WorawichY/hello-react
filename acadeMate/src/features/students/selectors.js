import { createSelector } from '@reduxjs/toolkit';
import { selectAllStudents, selectStudentById } from './studentsSlice';

export const selectStudentsStatus = state => state.students.status;
export const selectStudentsError = state => state.students.error;

export const selectAllGrades = (state) => state.grades.list;
export const selectAllCourses = (state) => state.courses.list;

// Helper to calculate GPA for a student
const getStudentGpa = (student, grades, courses) => {
    if (!student) return 0;
    const studentGrades = grades.filter(g => g.studentId === student.id || g.studentId === student.id.toString() || g.studentId === Number(student.id));
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
export const selectStudentsWithComputedGpa = createSelector(
    [selectAllStudents, selectAllGrades, selectAllCourses],
    (students, grades, courses) => {
        return students.map(student => ({
            ...student,
            computedGpa: getStudentGpa(student, grades, courses)
        }));
    }
);

// Factory pattern for parametric selector to prevent cache thrashing (Slide 9)
export const makeSelectStudentWithComputedGpaById = () => createSelector(
    [
        (state, studentId) => selectStudentById(state, studentId),
        selectAllGrades,
        selectAllCourses
    ],
    (student, grades, courses) => {
        if (!student) return null;
        return {
            ...student,
            computedGpa: getStudentGpa(student, grades, courses)
        };
    }
);

export const selectAverageGpa = createSelector(
    [selectStudentsWithComputedGpa],
    (studentsWithGpa) => {
        if (studentsWithGpa.length === 0) return "0.00";
        const total = studentsWithGpa.reduce((sum, s) => sum + s.computedGpa, 0);
        return (total / studentsWithGpa.length).toFixed(2);
    }
);

export const selectHighAchievers = createSelector(
    [selectStudentsWithComputedGpa],
    (studentsWithGpa) => studentsWithGpa.filter(s => s.computedGpa >= 3.5)
);

export const selectHighAchieversCount = createSelector(
    [selectHighAchievers],
    (highAchievers) => highAchievers.length
);

export const selectGpaDistribution = createSelector(
    [selectStudentsWithComputedGpa],
    (studentsWithGpa) => ({
        high: studentsWithGpa.filter(s => s.computedGpa >= 3.5).length,
        medium: studentsWithGpa.filter(s => s.computedGpa >= 2.5 && s.computedGpa < 3.5).length,
        low: studentsWithGpa.filter(s => s.computedGpa < 2.5).length,
    })
);
