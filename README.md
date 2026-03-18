# MedRemind — Medication Reminder App

A mobile-first medication management UI built with React. Designed with accessibility, clarity, and calm aesthetics at its core — because the people who need this app most are often under stress.

---

## Overview

MedRemind helps users track their daily medications, stay consistent with their doses, and never miss a refill. The design prioritises low-friction interactions: checking off a dose takes one tap, the progress ring gives an instant visual summary, and refill alerts surface before it's too late.

**Live demo →** *(add Vercel link here)*

---

## Design Decisions

### Why this problem?
Medication non-adherence affects an estimated 50% of patients with chronic conditions. Most reminder apps are either clinically sterile or overwhelming. This project explores what a calm, human-centred alternative could look like.

### Aesthetic direction
Warm off-whites, serif display type (Lora), and muted tones — chosen deliberately to feel less like a medical tool and more like a personal journal. The colour coding per medication is functional, not decorative.

### Accessibility considerations
- All interactive elements have `aria-label` attributes
- Dose buttons use `aria-pressed` to communicate state to screen readers
- Colour is never the only indicator of status — text and icons reinforce every state
- Touch targets are minimum 44×44px

### Key UX patterns
- **Progress ring** — at-a-glance completion summary without counting
- **Streak tracking** — lightweight motivation without gamification overload
- **Inline expand** — details hidden by default to reduce cognitive load
- **Refill alerts** — surface 7 days before refill date

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| CSS Modules | Scoped component styling |
| Lora + DM Sans | Typography (via Google Fonts) |
| Vite | Build tool |

No UI libraries. No component kits. Everything is hand-crafted.

---

## Getting Started
```bash
git clone https://github.com/JoY01Sang/medremind.git
cd medremind
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

- Daily dose schedule with one-tap check-off
- Animated progress ring (doses taken / total)
- 7-day week strip with current day highlight
- Per-medication streak tracking
- Refill date alerts (7-day warning)
- Expandable card details (notes, streak, refill)
- Add medication form with validation
- Colour coding per medication
- Accessible dose buttons with ARIA states

---

## Author

**JOY SAMG**
· [GitHub](https://github.com/JoY01Sang)

---

## License

MIT