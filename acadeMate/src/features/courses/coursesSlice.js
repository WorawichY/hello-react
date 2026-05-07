import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses } from './coursesThunks';
const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
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
    extraReducers: builder => {
        builder
            .addCase(fetchCourses.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.list = payload;
            })
            .addCase(fetchCourses.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload;
            });
    },
});
export const { addCourse, deleteCourse } = coursesSlice.actions;
export const selectAllCourses = (state) => state.courses.list;
export default coursesSlice.reducer;