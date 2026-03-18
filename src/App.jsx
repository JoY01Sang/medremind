import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AddMedication from "./components/AddMedication";
import "./App.css";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Metformin",
      dosage: "500mg",
      times: ["08:00", "20:00"],
      color: "#5DCAA5",
      icon: "💊",
      taken: { "08:00": true, "20:00": false },
      streak: 12,
      refillDate: "2026-04-01",
      notes: "Take with food",
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      times: ["09:00"],
      color: "#7F77DD",
      icon: "💊",
      taken: { "09:00": false },
      streak: 7,
      refillDate: "2026-03-25",
      notes: "Avoid potassium supplements",
    },
    {
      id: 3,
      name: "Vitamin D3",
      dosage: "1000 IU",
      times: ["08:00"],
      color: "#EF9F27",
      icon: "🌟",
      taken: { "08:00": true },
      streak: 21,
      refillDate: "2026-05-10",
      notes: "",
    },
  ]);

  const addMedication = (med) => {
    setMedications((prev) => [
      ...prev,
      { ...med, id: Date.now(), taken: {}, streak: 0 },
    ]);
    setView("dashboard");
  };

  const toggleTaken = (medId, time) => {
    setMedications((prev) =>
      prev.map((m) =>
        m.id === medId
          ? { ...m, taken: { ...m.taken, [time]: !m.taken[time] } }
          : m
      )
    );
  };

  return (
    <div className="app">
      {view === "dashboard" && (
        <Dashboard
          medications={medications}
          onToggleTaken={toggleTaken}
          onAddNew={() => setView("add")}
        />
      )}
      {view === "add" && (
        <AddMedication onAdd={addMedication} onBack={() => setView("dashboard")} />
      )}
    </div>
  );
}
