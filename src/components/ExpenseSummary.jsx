import { useExpenses } from "../context/ExpenseContext";
import styles from "./ExpenseSummary.module.css";

function ExpenseSummary() {
  const { expenses, totalAmount, categories } = useExpenses();

  const byCategory = categories.reduce((acc, cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);

    if (total > 0) acc[cat] = total;
    return acc;
  }, {});

  return (
    <div className={styles.summary}>
      <h2>Total: ${totalAmount.toFixed(2)}</h2>
      <p>{expenses.length} transactions</p>

      {Object.entries(byCategory).map(([cat, amt]) => (
        <div key={cat} className={styles.categoryItem}>
          {cat}: ${amt.toFixed(2)}
        </div>
      ))}
    </div>
  );
}

export default ExpenseSummary;