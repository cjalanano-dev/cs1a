# CS1A Class Dashboard (BSCS 1A - LSPU SPCC)

A centralized class portal designed to streamline communication and transparency for the **Bachelor of Science in Computer Science - Section 1A**.

This dashboard serves as the digital headquarters for the section, providing real-time updates on schedules, finances, and academic resources without the need for individual student logins.

## Features

### 1. **Live Dashboard**
- **Real-Time Status**: Displays the current class status (e.g., "Class in Session", "Lunch Break", "Free Cut") based on the official schedule.
- **Urgent Ticker**: Marquee alert system for high-priority announcements (e.g., immediate contributions, cancellations).
- **Quick Actions**: One-click access to essential tools like Google Classroom and CodeChum.

### 2. **Financial Transparency**
- **Ledger Board**: A public, read-only view of class funds.
- **Auto-Calculated Balance**: Real-time tracking of "Total Collected" vs. "Total Expenses" to show the current cash-on-hand.
- **Proof of Transaction**: Links to receipts for every expense to ensure accountability.

### 3. **Academic Hub**
- **Subject Cards**: Individual cards for each enrolled subject (e.g., CMSC 101, ITEC 103).
- **Resource Access**: Dropdown menus providing direct links to:
  - **Google Drive Reviewers**: Shared folders for study materials.
  - **Syllabus**: The official course outline.
- **Quiz Countdown**: Visual indicators for upcoming quizzes and exams.

### 4. **Unified Calendar**
- **Timeline View**: A chronological timeline merging academic deadlines (quizzes, projects) and general announcements.
- **Smart Sorting**: Automatically dims past events and highlights upcoming ones.

### 5. **Class Officers**
- **Contact Directory**: A list of current class officers with direct Email and Facebook links for concerns.

---

## Tech Stack & Architecture

This project is built with a focus on **performance**, **simplicity**, and **aesthetic**.

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5) - For a reactive, high-performance frontend.
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) - Utilizing a custom "Zinc & Green" color palette for a modern, developer-centric look.
- **Icons**: [Lucide-Svelte](https://lucide.dev/) - Clean, consistent SVG icons.
- **Data Layer**:
  - **Google Sheets as CMS**: The app fetches data directly from a published Google Sheet CSV. This allows officers to update content (announcements, finances) without touching a line of code.
  - **PapaParse**: Used to parse the CSV data into usable JSON for the application state.
  - **Svelte Stores**: Manages the application state (announcements, ledger, academics) globally.

### Data Structure
The application consumes data from three main sheets:
1. **Announcements**: alerts, urgency levels, expiry dates.
2. **Finance_Ledger**: transaction dates, amounts, types (collection/expense), receipts.
3. **Academics**: subject codes, professors, resource links, quiz dates.

---

*Verified and maintained by Carlos James Alanano.*
