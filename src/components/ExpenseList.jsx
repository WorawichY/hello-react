import { useExpenses } from "../context/ExpenseContext";
import styles from "./ExpenseList.module.css";

function ExpenseList() {
  const { filteredExpenses, deleteExpense, filter, setFilter, categories } =
    useExpenses();

  return (
    <div className={styles.card}>
      {/* Filter */}
      <div className={styles.tabs}>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? styles.activeTab : styles.tab}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      {filteredExpenses.map((e) => (
        <div key={e.id} className={styles.item}>
          <span>{e.name}</span>
          <span className={styles.amount}>
            ${e.amount.toFixed(2)}
          </span>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteExpense(e.id)}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;