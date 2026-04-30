import { useState, useEffect } from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import ExpenseSummary from "./components/ExpenseSummary";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import WeatherInfo from "./components/WeatherInfo";
import styles from "./App.module.css";

function App() {
  const [isDark, setIsDark] = useState(false);
  const title = import.meta.env.VITE_APP_APP_TITLE || "Expense Tracker";

  // Handle Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [isDark]);

  return (
    <ExpenseProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <button 
            className={styles.themeToggle}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        <WeatherInfo />
        <ExpenseSummary />
        <AddExpenseForm />
        <ExpenseList />

        <footer style={{ marginTop: "40px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          <p>v{import.meta.env.VITE_APP_VERSION} By WorawxxhOfficial</p>
        </footer>
      </div>
    </ExpenseProvider>
  );
}

export default App;