import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchStudents } from './studentsThunks';

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
    reducers: {},
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
            });
    },
});

export const {
    selectAll: selectAllStudents,
    selectById: selectStudentById,
    selectTotal: selectStudentCount,
} = studentsAdapter.getSelectors(state => state.students);

export default studentsSlice.reducer;
