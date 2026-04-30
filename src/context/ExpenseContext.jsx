import { createContext, useContext, useReducer, useEffect } from "react";

const ExpenseContext = createContext();

const CATEGORIES = ["Food", "Transport", "Entertainment", "Shopping", "Health", "Other"];

const initialState = {
  expenses: [],
  filter: "All",
};

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, expenses: [...state.expenses, action.payload] };

    case "DELETE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };

    case "FILTER":
      return { ...state, filter: action.payload };

    case "LOAD":
      return { ...state, expenses: action.payload };

    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // โหลดจาก localStorage
  useEffect(() => {
    const data = localStorage.getItem("expenses");
    if (data) {
      dispatch({ type: "LOAD", payload: JSON.parse(data) });
    }
  }, []);

  // save ลง localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  const addExpense = (name, amount, category) => {
    dispatch({
      type: "ADD",
      payload: {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString(),
      },
    });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const setFilter = (cat) => {
    dispatch({ type: "FILTER", payload: cat });
  };

  const totalAmount = state.expenses.reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses =
    state.filter === "All"
      ? state.expenses
      : state.expenses.filter((e) => e.category === state.filter);

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        filteredExpenses,
        totalAmount,
        filter: state.filter,
        categories: CATEGORIES,
        addExpense,
        deleteExpense,
        setFilter,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);