import { createAsyncThunk } from '@reduxjs/toolkit';

// Replace this URL with your mock API path if needed.
// Example: VITE_COURSE_API_URL=https://69fc380afce564e259177e83.mockapi.io/coruses
const COURSE_API_URL = import.meta.env.VITE_COURSE_API_URL || 'https://REPLACE_WITH_MOCK_API_URL/coruses';

const FALLBACK_COURSES = [
    { id: '1', code: 'CS101', title: 'Data Structures', credit: 3, instructor: 'Dr. Smith', createdAt: new Date().toISOString() },
    { id: '2', code: 'AI201', title: 'AI Fundamentals', credit: 4, instructor: 'Prof. Miller', createdAt: new Date().toISOString() },
    { id: '3', code: 'WD301', title: 'Web Development', credit: 3, instructor: 'Jan Rippin', createdAt: new Date().toISOString() },
    { id: '4', code: 'NS401', title: 'Network Security', credit: 3, instructor: 'Human Integration Representative', createdAt: new Date().toISOString() },
];

export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (_, { rejectWithValue }) => {
        if (COURSE_API_URL.includes('REPLACE_WITH_MOCK_API_URL')) {
            return FALLBACK_COURSES;
        }

        try {
            const response = await fetch(COURSE_API_URL);
            if (!response.ok) {
                return rejectWithValue(`Failed to load courses: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);