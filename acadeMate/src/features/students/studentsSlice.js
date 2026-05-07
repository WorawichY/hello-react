import { createSlice } from '@reduxjs/toolkit';
import { fetchStudents } from './studentsThunks';
const studentsSlice = createSlice({
name: 'students',
initialState: {
  list: [],
  status: 'idle', // NEW: tracks async state
  error: null, // NEW: holds error message if failed
},
reducers: {
	addStudent: (state, action) => {
		state.list.push({
            createdAt: new Date().toISOString(),
            avatar: action.payload.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(action.payload.name)}`,
            ...action.payload
        });
	},
	updateStudent: (state, action) => {
		const index = state.list.findIndex(student => student.id === action.payload.id);
		if (index !== -1) {
			state.list[index] = action.payload;
		}
	},
	deleteStudent: (state, action) => {
		state.list = state.list.filter(student => student.id !== action.payload);
	},
},
extraReducers: builder => {
builder
.addCase(fetchStudents.pending, state => { state.status = 'loading'; state.error = null; })
.addCase(fetchStudents.fulfilled, (state, { payload }) => { state.status = 'succeeded'; state.list = payload; })
.addCase(fetchStudents.rejected, (state, { payload }) => { state.status = 'failed'; state.error = payload; })
;
},
});

// Named exports: action creators — used in components (Session 3)
export const { addStudent, deleteStudent, updateStudent } = studentsSlice.actions;
// Default export: reducer — imported in store.js
export default studentsSlice.reducer;
export const selectAllStudents = state => state.students.list;