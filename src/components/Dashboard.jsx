import { useState } from "react";
import MedCard from "./MedCard";
import StreakBadge from "./StreakBadge";
import styles from "./Dashboard.module.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getTodayDoses(medications) {
  let total = 0, taken = 0;
  medications.forEach((m) => {
    m.times.forEach((t) => {
      total++;
      if (m.taken[t]) taken++;
    });
  });
  return { total, taken };
}

function getRefillAlerts(medications) {
  const today = new Date();
  return medications.filter((m) => {
    const d = new Date(m.refillDate);
    const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
    return diff <= 7 && diff >= 0;
  });
}

export default function Dashboard({ medications, onToggleTaken, onAddNew }) {
  const today = new Date();
  const { total, taken } = getTodayDoses(medications);
  const refillAlerts = getRefillAlerts(medications);
  const pct = total === 0 ? 0 : Math.round((taken / total) * 100);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 3 + i);
    return d;
  });

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>{getGreeting()}</p>
          <h1 className={styles.date}>
            {DAYS[today.getDay()]}, {MONTHS[today.getMonth()]} {today.getDate()}
          </h1>
        </div>
        <button className={styles.addBtn} onClick={onAddNew} aria-label="Add medication">
          <span>+</span>
        </button>
      </header>

      {/* Week strip */}
      <div className={styles.weekStrip}>
        {weekDays.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          return (
            <div key={i} className={`${styles.dayPip} ${isToday ? styles.dayPipActive : ""}`}>
              <span className={styles.dayLabel}>{DAYS[d.getDay()]}</span>
              <span className={styles.dayNum}>{d.getDate()}</span>
            </div>
          );
        })}
      </div>

      {/* Progress card */}
      <div className={styles.progressCard} style={{ animationDelay: "0.05s" }}>
        <div className={styles.progressTop}>
          <div>
            <p className={styles.progressLabel}>Today's doses</p>
            <p className={styles.progressCount}>
              <span className={styles.progressTaken}>{taken}</span>
              <span className={styles.progressTotal}> / {total}</span>
            </p>
          </div>
          <div className={styles.ringWrap}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#F0EDE6" strokeWidth="6" />
              <circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke={pct === 100 ? "#1D9E75" : "#534AB7"}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                transform="rotate(-90 32 32)"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <span className={styles.ringPct}>{pct}%</span>
          </div>
        </div>
        {pct === 100 && (
          <div className={styles.allDoneBar}>
            <span>All doses taken today</span>
            <span>🎉</span>
          </div>
        )}
      </div>

      {/* Refill alerts */}
      {refillAlerts.length > 0 && (
        <div className={styles.alertBox}>
          <span className={styles.alertIcon}>⚠️</span>
          <div>
            <p className={styles.alertTitle}>Refill soon</p>
            <p className={styles.alertText}>
              {refillAlerts.map((m) => m.name).join(", ")} running low
            </p>
          </div>
        </div>
      )}

      {/* Streaks row */}
      <div className={styles.streakRow}>
        {medications.map((m) => (
          <StreakBadge key={m.id} name={m.name} streak={m.streak} color={m.color} />
        ))}
      </div>

      {/* Med cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Today's schedule</h2>
        <div className={styles.cardList}>
          {medications.map((m, i) => (
            <MedCard
              key={m.id}
              med={m}
              onToggle={onToggleTaken}
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            />
          ))}
        </div>
      </section>

      {/* Bottom spacer */}
      <div style={{ height: 32 }} />
    </div>
  );
}