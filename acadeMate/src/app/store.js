import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import studentsReducer from "../features/students/studentsSlice";
import coursesReducer from "../features/courses/coursesSlice";
import gradesReducer from "../features/grades/gradesSlice";
import { studentsApi } from "../features/students/studentsApi";
import loggerMiddleware from "./middleware/logger";

export const store = configureStore({
    reducer: {
        students: studentsReducer,
        courses: coursesReducer,
        grades: gradesReducer,
        [studentsApi.reducerPath]: studentsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(studentsApi.middleware)
            .concat(loggerMiddleware),
});

setupListeners(store.dispatch);
