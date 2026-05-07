import { createSlice } from '@reduxjs/toolkit';
const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        list: [
            { id: 1, code: 'CS101', title: 'Data Structures', credits: 3, dept: 'CS' },
            { id: 2, code: 'AI201', title: 'AI Fundamentals', credits: 3, dept: 'CS' },
            { id: 3, code: 'WD301', title: 'Web Development', credits: 3, dept: 'IT' },
            { id: 4, code: 'NS401', title: 'Network Security', credits: 3, dept: 'IT' },
        ]
    },
    reducers: {
        addCourse: (state, action) => {
            state.list.push(action.payload);
        },
        deleteCourse: (state, action) => {
            state.list = state.list.filter(
                c => c.id !== action.payload);
        },
    },
});
export const { addCourse, deleteCourse } = coursesSlice.actions;
export const selectAllCourses = (state) => state.courses.list;
export default coursesSlice.reducer;