import { configureStore } from "@reduxjs/toolkit";
// Import slice reducers (we will create these in Steps 2–4)
import studentsReducer from "../features/students/studentsSlice";
import coursesReducer from "../features/courses/coursesSlice";
import gradesReducer from "../features/grades/gradesSlice";
export const store = configureStore({
    reducer: {
        students: studentsReducer, // → state.students (accessed with useSelector)
        courses: coursesReducer, // → state.courses
        grades: gradesReducer, // → state.grades
    },
    // ↑ configureStore internally calls combineReducers({ students, courses, grades })
    // ↑ redux-thunk middleware is included automatically
    // ↑ Redux DevTools is configured automatically in development mode
});