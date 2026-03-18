import styles from "./StreakBadge.module.css";

export default function StreakBadge({ name, streak, color }) {
  return (
    <div className={styles.badge}>
      <div className={styles.dot} style={{ background: color }} />
      <span className={styles.name}>{name.split(" ")[0]}</span>
      <span className={styles.streak}>🔥 {streak}d</span>
    </div>
  );
}