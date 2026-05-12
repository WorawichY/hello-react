import { createAsyncThunk } from '@reduxjs/toolkit';

// Helper for simulated delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
        await delay(1000); // Simulated delay
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

export const addStudentAsync = createAsyncThunk(
    'students/addStudentAsync',
    async (newStudent, { rejectWithValue }) => {
        await delay(800);
        if (STUDENT_API_URL.includes('REPLACE_WITH_MOCK_API_URL')) {
            return { ...newStudent, id: Date.now().toString() };
        }
        try {
            const response = await fetch(STUDENT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
            });
            if (!response.ok) return rejectWithValue('Failed to add student');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateStudentAsync = createAsyncThunk(
    'students/updateStudentAsync',
    async (student, { rejectWithValue }) => {
        await delay(800);
        if (STUDENT_API_URL.includes('REPLACE_WITH_MOCK_API_URL')) {
            return student;
        }
        try {
            const response = await fetch(`${STUDENT_API_URL}/${student.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student),
            });
            if (!response.ok) return rejectWithValue('Failed to update student');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteStudentAsync = createAsyncThunk(
    'students/deleteStudentAsync',
    async (id, { rejectWithValue }) => {
        await delay(800);
        if (STUDENT_API_URL.includes('REPLACE_WITH_MOCK_API_URL')) {
            return id;
        }
        try {
            const response = await fetch(`${STUDENT_API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) return rejectWithValue('Failed to delete student');
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

