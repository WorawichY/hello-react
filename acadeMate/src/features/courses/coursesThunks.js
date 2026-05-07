import { createAsyncThunk } from '@reduxjs/toolkit';

// Replace this URL with your mock API path if needed.
// Example: VITE_COURSE_API_URL=https://69fc380afce564e259177e83.mockapi.io/coruses
const COURSE_API_URL = import.meta.env.VITE_COURSE_API_URL || 'https://REPLACE_WITH_MOCK_API_URL/coruses';

const FALLBACK_COURSES = [
    { id: 1, code: 'CS101', title: 'Data Structures', credits: 3, dept: 'CS' },
    { id: 2, code: 'AI201', title: 'AI Fundamentals', credits: 3, dept: 'CS' },
    { id: 3, code: 'WD301', title: 'Web Development', credits: 3, dept: 'IT' },
    { id: 4, code: 'NS401', title: 'Network Security', credits: 3, dept: 'IT' },
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