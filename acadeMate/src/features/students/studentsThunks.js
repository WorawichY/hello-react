import { createAsyncThunk } from '@reduxjs/toolkit';

// Replace this URL with your mock API path.
// Example: VITE_STUDENT_API_URL=https://your-mock-api.mockapi.io/students
const STUDENT_API_URL = import.meta.env.VITE_STUDENT_API_URL || 'https://REPLACE_WITH_MOCK_API_URL/students';

const FALLBACK_STUDENTS = [
    { id: 1, name: 'Alice Brown', studentId: 'S1001', major: 'Computer Science', gpa: 3.8 },
    { id: 2, name: 'Benjamin King', studentId: 'S1002', major: 'Information Technology', gpa: 3.2 },
    { id: 3, name: 'Carla Diaz', studentId: 'S1003', major: 'Design', gpa: 3.9 },
];

export const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async (_, { rejectWithValue }) => {
        if (STUDENT_API_URL.includes('REPLACE_WITH_MOCK_API_URL')) {
            return FALLBACK_STUDENTS;
        }

        try {
            const response = await fetch(STUDENT_API_URL);
            if (!response.ok) {
                return rejectWithValue(`Failed to load students: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);
