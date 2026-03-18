import { useState } from "react";
import styles from "./MedCard.module.css";

function timeLabel(time) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

function daysUntilRefill(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function MedCard({ med, onToggle, style }) {
  const [expanded, setExpanded] = useState(false);
  const allTaken = med.times.every((t) => med.taken[t]);
  const refillDays = daysUntilRefill(med.refillDate);

  return (
    <div
      className={`${styles.card} ${allTaken ? styles.cardDone : ""}`}
      style={style}
    >
      <div className={styles.cardMain} onClick={() => setExpanded((e) => !e)}>
        <div className={styles.colorDot} style={{ background: med.color }} />
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <span className={styles.name}>{med.name}</span>
            <span className={styles.dosage}>{med.dosage}</span>
          </div>
          <div className={styles.times}>
            {med.times.map((t) => (
              <span
                key={t}
                className={`${styles.timeChip} ${med.taken[t] ? styles.timeChipDone : ""}`}
              >
                {timeLabel(t)}
              </span>
            ))}
          </div>
        </div>
        <button
          className={styles.chevron}
          aria-label={expanded ? "Collapse" : "Expand"}
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dose buttons */}
      <div className={styles.doseRow}>
        {med.times.map((t) => (
          <button
            key={t}
            className={`${styles.doseBtn} ${med.taken[t] ? styles.doseBtnDone : ""}`}
            onClick={() => onToggle(med.id, t)}
            aria-pressed={med.taken[t]}
            aria-label={`Mark ${timeLabel(t)} ${med.taken[t] ? "not taken" : "taken"}`}
          >
            <span className={styles.doseBtnCheck}>
              {med.taken[t] ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <span style={{ fontSize: 11, opacity: 0.5 }}>○</span>
              )}
            </span>
            <span>{timeLabel(t)}</span>
          </button>
        ))}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className={styles.details}>
          {med.notes && (
            <p className={styles.detailNote}>
              <span className={styles.detailIcon}>📝</span> {med.notes}
            </p>
          )}
          <div className={styles.detailRow}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Streak</span>
              <span className={styles.detailValue}>{med.streak} days 🔥</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Refill in</span>
              <span
                className={styles.detailValue}
                style={{ color: refillDays <= 7 ? "var(--amber)" : "inherit" }}
              >
                {refillDays}d
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}