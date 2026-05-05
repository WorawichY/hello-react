// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../features/students/studentsSlice";
import coursesReducer from "../features/courses/coursesSlice";
import gradesReducer from "../features/grades/gradesSlice";

// 1. Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("academate_state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 2. Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("academate_state", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer,
    grades: gradesReducer,
  },
  preloadedState: persistedState, // Initialize with saved data
});

// 3. Subscribe to store changes to save them
store.subscribe(() => {
  saveState(store.getState());
});
