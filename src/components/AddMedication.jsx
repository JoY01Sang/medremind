import { useState } from "react";
import styles from "./AddMedication.module.css";

const COLORS = ["#5DCAA5", "#7F77DD", "#EF9F27", "#D85A30", "#378ADD", "#D4537E"];

export default function AddMedication({ onAdd, onBack }) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [times, setTimes] = useState(["08:00"]);
  const [color, setColor] = useState(COLORS[0]);
  const [refillDate, setRefillDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const addTime = () => setTimes((t) => [...t, "12:00"]);
  const removeTime = (i) => setTimes((t) => t.filter((_, idx) => idx !== i));
  const updateTime = (i, val) => setTimes((t) => t.map((v, idx) => (idx === i ? val : v)));

  const handleSubmit = () => {
    if (!name.trim()) { setError("Medication name is required."); return; }
    if (!dosage.trim()) { setError("Dosage is required."); return; }
    if (!refillDate) { setError("Refill date is required."); return; }
    setError("");
    onAdd({ name: name.trim(), dosage: dosage.trim(), times, color, refillDate, notes, icon: "💊", streak: 0 });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className={styles.title}>Add medication</h1>
        <div style={{ width: 36 }} />
      </header>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Medication name</label>
          <input
            className={styles.input}
            placeholder="e.g. Aspirin"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Dosage</label>
          <input
            className={styles.input}
            placeholder="e.g. 100mg"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Dose times</label>
          <div className={styles.timesWrap}>
            {times.map((t, i) => (
              <div key={i} className={styles.timeRow}>
                <input
                  type="time"
                  className={styles.input}
                  value={t}
                  onChange={(e) => updateTime(i, e.target.value)}
                  style={{ flex: 1 }}
                />
                {times.length > 1 && (
                  <button className={styles.removeBtn} onClick={() => removeTime(i)} aria-label="Remove time">
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button className={styles.addTimeBtn} onClick={addTime}>
              + Add another time
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Colour</label>
          <div className={styles.colorRow}>
            {COLORS.map((c) => (
              <button
                key={c}
                className={`${styles.colorSwatch} ${color === c ? styles.colorSwatchActive : ""}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Select colour ${c}`}
                aria-pressed={color === c}
              >
                {color === c && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Next refill date</label>
          <input
            type="date"
            className={styles.input}
            value={refillDate}
            onChange={(e) => setRefillDate(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Notes <span className={styles.optional}>(optional)</span></label>
          <textarea
            className={styles.textarea}
            placeholder="e.g. Take with food, avoid alcohol…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Save medication
        </button>
      </div>
    </div>
  );
}