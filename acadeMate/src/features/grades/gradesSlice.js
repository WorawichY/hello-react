import { createSlice } from '@reduxjs/toolkit';
const gradesSlice = createSlice({
    name: 'grades',
    initialState: { list: [] },
    reducers: {
        addGrade: (state, action) => {
            state.list.push({
                id: Date.now(),
                ...action.payload,
                // payload: { studentId,
                // courseId, grade, semester }
            });
        },
        updateGrade: (state, action) => {
            const i = state.list.findIndex(
                g => g.id === action.payload.id);
            if (i !== -1) state.list[i] =
                action.payload;
        },
        deleteGrade: (state, action) => {
            state.list = state.list.filter(
                g => g.id !== action.payload);
        },
    },
});
export const { addGrade, updateGrade, deleteGrade } =
    gradesSlice.actions;
export const selectAllGrades = (state) => state.grades.list;
export default gradesSlice.reducer;