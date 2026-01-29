
# Kultur Juara - Athlete & Academy Management System

This is a comprehensive, data-driven platform designed to manage all aspects of a professional badminton academy. From athlete registration and multi-faceted evaluations to real-time training logs and administrative controls, this system provides a holistic view of athlete development and academy operations.

## ✨ Core Modules

-   **Athlete Information System (AIS):** Central hub for all athlete data.
-   **Performance Evaluation Suite:** Tools for in-depth analysis of athlete capabilities.
-   **Daily Monitoring & Logs:** Continuous tracking of training, health, and well-being.
-   **Academy Operations:** Dashboards for managing day-to-day academy logistics.
-   **Public & Player Portals:** Interfaces for public information and athlete self-service.

---

## 🚀 Detailed Features

### Athlete Management

-   👤 **Registrasi Atlet Baru:** Digital registration form with comprehensive data validation to onboard new athletes into the academy.
-   📇 **Roster Atlet Terpusat:** A searchable database of all registered athletes, providing a quick overview of active members.
-   🛡️ **Verifikasi Dokumen:** A dedicated workflow for administrators to validate identity documents (KTP, Akta) to ensure age and category eligibility.

### Performance Evaluation Suite

-   💪 **Evaluasi Fisik:** A form to quantitatively measure an athlete's physical progress, including anthropometry (height, weight), strength (jumps, push-ups), endurance (bleep test), and flexibility.
-   🏸 **Evaluasi Teknik:** A tool for coaches to assess stroke quality (serves, smash, net play) on a rating scale, supplemented by objective training statistics.
-   ♟️ **Evaluasi Taktik:** A form to analyze an athlete's game sense, dominant play patterns, decision-making speed, and adaptability.
-   🧠 **Evaluasi Mental & Psikologis:** A dynamic, age-adaptive assessment tool (from 3 to 20 years old) to monitor psychological well-being, using methods from observational checklists to guided self-reports.

### Daily Monitoring & Logs

-   📋 **Daily Training Log:** Enables coaches to log details of each training session, including type, duration, RPE intensity, and heart rate data.
-   🏆 **Match Log:** A form to record official tournament match results, including opponent details, scores, duration, and key statistics like errors and winners.
-   🥗 **Log Nutrisi & Recovery:** A daily log for athletes or coaches to track nutrition, hydration, sleep quality, and DOMS (Delayed Onset Muscle Soreness) levels.
-   ❤️ **Athlete Mental Expression Log (AMEL):** A structured and private journal for athletes to express their mental state through check-ins, guided prompts, and a critical safety-check mechanism.

### Academy & Tournament Operations (Admin Portal)

-   📊 **Main Dashboard:** A central overview of all academy activities and key performance indicators.
-   🚪 **Gate Control:** A real-time interface for managing venue access, scanning tickets, and monitoring crowd capacity.
-   🚑 **Dispatch HQ:** A command center for handling live incidents (Medical, Security, Technical) and dispatching available units.
-   🚚 **Logistics Command:** A suite of tools for managing academy assets:
    -   **Inventory:** Tracking non-consumable assets like chairs and electronics.
    -   **Consumables:** Monitoring stock levels of daily supplies like water and tape.
    -   **Shuttlecock Control:** A dedicated system for managing shuttlecock distribution and stock.
-   ♟️ **Strategic Planning:** A dashboard for proposing and approving program budgets and viewing the master plan.
-   ⚖️ **Protest Tribunal:** A formal system for managing and resolving official protests filed during a tournament.
-   🔐 **User Management:** An interface for administrators to manage user access, roles, and permissions within the system.

### User Portals

-   **Manager Portal:** A dedicated dashboard for external team managers to register their players, check validation status, and manage team finances.
-   **Player Portal:** A self-service area for athletes to view their schedules, check their TPF assessment results, and monitor their progress.
-   **Public Pages:** Includes a homepage, schedule, live bracket, and information about the academy's programs and rules, all accessible to the public.

---

## 🛠️ Technical Stack

-   **Framework:** Next.js (App Router)
-   **Language:** TypeScript
-   **Database:** Firebase Firestore
-   **Authentication:** Firebase Authentication
-   **UI:** React, ShadCN UI, Tailwind CSS
-   **Generative AI:** Genkit

---

## ▶️ Getting Started

To run the project locally, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.
