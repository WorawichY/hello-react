import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import studentsReducer from '../features/students/studentsSlice';
import coursesReducer from '../features/courses/coursesSlice';
import gradesReducer from '../features/grades/gradesSlice';
import { studentsApi } from '../features/students/studentsApi';

export function renderWithProviders(ui, { preloadedState = {} } = {}) {
    const store = configureStore({
        reducer: {
            students: studentsReducer,
            courses: coursesReducer,
            grades: gradesReducer,
            [studentsApi.reducerPath]: studentsApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(studentsApi.middleware),
        preloadedState,
    });
    setupListeners(store.dispatch);

    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store,
    };
}
