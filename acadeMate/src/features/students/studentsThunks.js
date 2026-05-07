import { createAsyncThunk } from '@reduxjs/toolkit';

// Replace this URL with your mock API path.
// Example: VITE_STUDENT_API_URL=https://your-mock-api.mockapi.io/students
const STUDENT_API_URL = import.meta.env.VITE_STUDENT_API_URL || 'https://REPLACE_WITH_MOCK_API_URL/students';

const FALLBACK_STUDENTS = [
    { createdAt: "2026-05-06T22:14:10.405Z", name: 'Alice Brown', avatar: 'https://avatars.githubusercontent.com/u/32295160', studentId: 1001, major: 'Computer Science', gpa: 88, id: '1' },
    { createdAt: "2026-05-06T22:14:10.405Z", name: 'Benjamin King', avatar: 'https://avatars.githubusercontent.com/u/32295160', studentId: 1002, major: 'Information Technology', gpa: 88, id: '2' },
    { createdAt: "2026-05-06T22:14:10.405Z", name: 'Carla Diaz', avatar: 'https://avatars.githubusercontent.com/u/32295160', studentId: 1003, major: 'Design', gpa: 88, id: '3' },
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
