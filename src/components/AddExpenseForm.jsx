import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import styles from "./AddExpenseForm.module.css";

function AddExpenseForm() {
  const { addExpense, categories } = useExpenses();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return setError("Enter name");
    if (!amount || parseFloat(amount) <= 0) return setError("Enter valid amount");

    addExpense(name, parseFloat(amount), category);

    setName("");
    setAmount("");
    setError("");
  };

  return (
    <form className={styles.card + " " + styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <input
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Expense name"
      />

      <input
        className={styles.input}
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <button className={styles.button}>+ Add</button>
    </form>
  );
}

export default AddExpenseForm;