import { createSlice } from '@reduxjs/toolkit';
// Hard-coded initial data — Session 4 replaces this with API data
const INITIAL_STUDENTS = [
    { id: 1, name: 'Somchai Rakpong', studentId: '6501001', major: 'Computer Science', gpa: 3.85 },
    { id: 2, name: 'Naree Thongdee', studentId: '6501002', major: 'Information Technology', gpa: 3.60 },
    { id: 3, name: 'Krit Suwan', studentId: '6501003', major: 'Computer Science', gpa: 2.95 },
    { id: 4, name: 'Malee Jaikaew', studentId: '6501004', major: 'Business IT', gpa: 3.40 },
    { id: 5, name: 'Pong Srisuk', studentId: '6501005', major: 'Information Technology', gpa: 3.75 },
];
const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        list: INITIAL_STUDENTS, // Pre-populated — no API call needed yet
        status: 'idle', // 'idle'|'loading'|'succeeded'|'failed'
        error: null,
    },
    reducers: {
        addStudent: (state, action) => {
            state.list.push(action.payload); // Immer makes .push() safe
        },
        deleteStudent: (state, action) => {
            state.list = state.list.filter(s => s.id !== action.payload);
        },
        updateStudent: (state, action) => {
            const idx = state.list.findIndex(s => s.id === action.payload.id);
            if (idx !== -1) state.list[idx] = action.payload;
        },
    },
});
// Named exports: action creators — used in components (Session 3)
export const { addStudent, deleteStudent, updateStudent } = studentsSlice.actions;
// Default export: reducer — imported in store.js
export default studentsSlice.reducer;
export const selectAllStudents = state => state.students.list;