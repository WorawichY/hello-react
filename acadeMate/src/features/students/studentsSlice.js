import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchStudents, addStudentAsync, updateStudentAsync, deleteStudentAsync } from './studentsThunks';

const studentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = studentsAdapter.getInitialState({
    status: 'idle',
    error: null,
});

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent: (state, action) => {
            studentsAdapter.addOne(state, {
                createdAt: new Date().toISOString(),
                avatar: action.payload.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(action.payload.name)}`,
                ...action.payload
            });
        },
        updateStudent: (state, action) => {
            studentsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            });
        },
        deleteStudent: (state, action) => {
            studentsAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchStudents.pending, state => { 
                state.status = 'loading'; 
                state.error = null; 
            })
            .addCase(fetchStudents.fulfilled, (state, { payload }) => { 
                state.status = 'succeeded'; 
                studentsAdapter.setAll(state, payload); 
            })
            .addCase(fetchStudents.rejected, (state, { payload }) => { 
                state.status = 'failed'; 
                state.error = payload; 
            })
            .addCase(addStudentAsync.fulfilled, (state, { payload }) => {
                studentsAdapter.addOne(state, payload);
            })
            .addCase(updateStudentAsync.fulfilled, (state, { payload }) => {
                studentsAdapter.updateOne(state, {
                    id: payload.id,
                    changes: payload
                });
            })
            .addCase(deleteStudentAsync.fulfilled, (state, { payload }) => {
                studentsAdapter.removeOne(state, payload);
            });
    },
});

export const { addStudent, deleteStudent, updateStudent } = studentsSlice.actions;

export const {
    selectAll: selectAllStudents,
    selectById: selectStudentById,
    selectTotal: selectStudentCount,
} = studentsAdapter.getSelectors(state => state.students);

export default studentsSlice.reducer;